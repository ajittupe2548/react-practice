# High-Level Design: In-Memory SQL Database
## Frontend Perspective

---

## Table of Contents
1. [Overview](#overview)
2. [Requirements](#requirements)
3. [System Architecture](#system-architecture)
4. [Component Design](#component-design)
5. [API Contract](#api-contract)
6. [Data Models](#data-models)
7. [Data Flow](#data-flow)
8. [State Management Strategy](#state-management-strategy)
9. [Real-Time Communication](#real-time-communication)
10. [Caching Strategy](#caching-strategy)
11. [Error Handling & Resilience](#error-handling--resilience)
12. [Security Model](#security-model)
13. [Performance Optimization](#performance-optimization)
14. [Trade-offs & Design Decisions](#trade-offs--design-decisions)

---

## Overview

Design of a client-side architecture for interacting with an in-memory SQL database, focusing on real-time data synchronization, optimal performance, and excellent user experience.

### Key Features
- **Low Latency Queries**: Sub-100ms response times
- **Real-Time Updates**: Live data synchronization across clients
- **Offline Support**: Local caching with sync on reconnect
- **Type-Safe Queries**: Client-side query builders
- **Optimistic Updates**: Immediate UI feedback

### Use Cases
- Real-time analytics dashboards
- Collaborative editing tools (Google Docs-style)
- Live chat and messaging
- Financial trading platforms
- Gaming leaderboards and stats

---

## Requirements

### Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| F1 | Execute SQL queries (SELECT, INSERT, UPDATE, DELETE) | High |
| F2 | Subscribe to real-time table updates | High |
| F3 | Transaction management (begin, commit, rollback) | Medium |
| F4 | Schema introspection | Low |
| F5 | Parameterized queries | High |

### Non-Functional Requirements
| ID | Requirement | Target |
|----|-------------|--------|
| NF1 | Query latency | < 100ms (p95) |
| NF2 | Concurrent connections | 10,000+ |
| NF3 | System uptime | 99.9% |
| NF4 | Reconnection time | < 3 seconds |
| NF5 | Bundle size | < 50KB (gzipped) |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Application                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Presentation Layer                        │  │
│  │  (React Components, Vue Components, etc.)            │  │
│  └───────────────────┬──────────────────────────────────┘  │
│                      │                                      │
│  ┌───────────────────▼──────────────────────────────────┐  │
│  │            State Management Layer                    │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │  │ Query Cache │  │ App State    │  │ UI State   │ │  │
│  │  │ (TanStack)  │  │ (Redux/Zust) │  │            │ │  │
│  │  └─────────────┘  └──────────────┘  └────────────┘ │  │
│  └───────────────────┬──────────────────────────────────┘  │
│                      │                                      │
│  ┌───────────────────▼──────────────────────────────────┐  │
│  │         Data Access Layer (Client)                   │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │  │ DB Client   │  │ Query Builder│  │ WS Manager │ │  │
│  │  │ Library     │  │              │  │            │ │  │
│  │  └─────────────┘  └──────────────┘  └────────────┘ │  │
│  └───────────────────┬──────────────────┬───────────────┘  │
└────────────────────────────────────────────────────────────┘
                       │                  │
                       │ HTTP/REST        │ WebSocket
                       │                  │
┌──────────────────────▼──────────────────▼──────────────────┐
│                     API Gateway                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Rate Limiter │  │ Auth Guard   │  │ Load Balance │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│             In-Memory SQL Database Server                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Query Engine │  │ Transaction  │  │ Pub/Sub      │    │
│  │              │  │ Manager      │  │ Manager      │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│  ┌────────────────────────────────────────────────────┐   │
│  │           Memory Storage Layer                     │   │
│  │  (Tables, Indexes, Cache)                          │   │
│  └────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Design

### 1. Database Client Library
**Responsibility**: Manage all database interactions from the frontend

**Key Features**:
- Connection management with auto-reconnect
- Query execution with parameterization
- Transaction support
- Event subscription management

**Interface**:
```typescript
interface DBClient {
  // Connection
  connect(config: ConnectionConfig): Promise<void>
  disconnect(): Promise<void>
  
  // Queries
  query(sql: string, params?: any[]): Promise<QueryResult>
  execute(sql: string, params?: any[]): Promise<ExecuteResult>
  
  // Transactions
  beginTransaction(): Promise<Transaction>
  
  // Subscriptions
  subscribe(table: string, callback: SubscriptionCallback): Subscription
  unsubscribe(subscription: Subscription): void
  
  // Health
  ping(): Promise<boolean>
}
```

### 2. Query Builder
**Responsibility**: Type-safe SQL query construction

**Interface**:
```typescript
interface QueryBuilder {
  select(...columns: string[]): QueryBuilder
  from(table: string): QueryBuilder
  where(condition: Condition): QueryBuilder
  join(table: string, on: JoinCondition): QueryBuilder
  orderBy(column: string, direction: 'ASC' | 'DESC'): QueryBuilder
  limit(count: number): QueryBuilder
  offset(count: number): QueryBuilder
  build(): { sql: string, params: any[] }
}
```

### 3. WebSocket Manager
**Responsibility**: Handle real-time bidirectional communication

**Features**:
- Automatic reconnection with exponential backoff
- Message queuing during disconnection
- Heartbeat/ping mechanism
- Event multiplexing

**State Machine**:
```
DISCONNECTED ──connect()──> CONNECTING
                                │
                                ├──success──> CONNECTED
                                │                 │
                                │                 ├──disconnect()──> DISCONNECTING ──> DISCONNECTED
                                │                 │
                                │                 └──error──> RECONNECTING
                                │                                 │
                                └──error──> FAILED              (retry logic)
```

### 4. Cache Manager
**Responsibility**: Client-side data caching for performance

**Strategies**:
- **Query-based caching**: Cache by SQL query + params
- **Table-based invalidation**: Invalidate on table updates
- **TTL-based expiration**: Automatic stale data removal
- **LRU eviction**: Remove least recently used when full

**Cache Structure**:
```
Cache Store
├── Query Cache
│   ├── Key: hash(sql + params)
│   └── Value: { data, timestamp, ttl }
├── Metadata
│   ├── Hit/Miss rate
│   └── Cache size
└── Invalidation Map
    └── Table -> [Query Keys]
```

---

## API Contract

### REST Endpoints

#### 1. Execute Query
```
POST /api/query

Request:
{
  "sql": "SELECT * FROM users WHERE age > ?",
  "params": [18],
  "options": {
    "timeout": 5000,
    "cache": true
  }
}

Response (Success):
{
  "status": "success",
  "data": [
    { "id": 1, "name": "Alice", "age": 25 },
    { "id": 2, "name": "Bob", "age": 30 }
  ],
  "metadata": {
    "rowCount": 2,
    "executionTime": 12,
    "cached": false
  }
}

Response (Error):
{
  "status": "error",
  "error": {
    "code": "SYNTAX_ERROR",
    "message": "Invalid SQL syntax near 'FORM'",
    "details": {
      "line": 1,
      "column": 15
    }
  }
}
```

#### 2. Execute Mutation
```
POST /api/mutate

Request:
{
  "sql": "INSERT INTO users (name, email) VALUES (?, ?)",
  "params": ["John", "john@example.com"],
  "transactionId": "txn_abc123" // Optional
}

Response:
{
  "status": "success",
  "affectedRows": 1,
  "lastInsertId": 42,
  "executionTime": 8
}
```

#### 3. Transaction Management
```
POST /api/transaction/begin
Response: { "transactionId": "txn_abc123" }

POST /api/transaction/commit
Request: { "transactionId": "txn_abc123" }
Response: { "status": "committed" }

POST /api/transaction/rollback
Request: { "transactionId": "txn_abc123" }
Response: { "status": "rolled_back" }
```

#### 4. Schema Introspection
```
GET /api/schema/tables
Response: {
  "tables": ["users", "orders", "products"]
}

GET /api/schema/tables/users
Response: {
  "name": "users",
  "columns": [
    { "name": "id", "type": "INTEGER", "nullable": false, "primaryKey": true },
    { "name": "name", "type": "VARCHAR(100)", "nullable": false },
    { "name": "email", "type": "VARCHAR(255)", "nullable": false, "unique": true },
    { "name": "age", "type": "INTEGER", "nullable": true }
  ],
  "indexes": [
    { "name": "idx_email", "columns": ["email"], "unique": true }
  ]
}
```

### WebSocket Protocol

#### Connection
```
Client -> Server:
{
  "type": "AUTH",
  "token": "jwt_token_here"
}

Server -> Client:
{
  "type": "AUTH_SUCCESS",
  "clientId": "client_xyz"
}
```

#### Subscribe to Table Updates
```
Client -> Server:
{
  "type": "SUBSCRIBE",
  "table": "users",
  "filters": {
    "age": { "$gt": 18 }
  }
}

Server -> Client:
{
  "type": "SUBSCRIBED",
  "subscriptionId": "sub_123",
  "table": "users"
}
```

#### Receive Real-Time Updates
```
Server -> Client (Insert):
{
  "type": "INSERT",
  "table": "users",
  "subscriptionId": "sub_123",
  "data": {
    "id": 42,
    "name": "Alice",
    "email": "alice@example.com",
    "age": 25
  },
  "timestamp": 1642001234567
}

Server -> Client (Update):
{
  "type": "UPDATE",
  "table": "users",
  "subscriptionId": "sub_123",
  "id": 42,
  "changes": {
    "age": 26
  },
  "timestamp": 1642001234568
}

Server -> Client (Delete):
{
  "type": "DELETE",
  "table": "users",
  "subscriptionId": "sub_123",
  "id": 42,
  "timestamp": 1642001234569
}
```

---

## Data Models

### Client-Side State Structure

```typescript
// Query Cache Entry
interface CacheEntry {
  queryKey: string           // hash(sql + params)
  data: any[]
  timestamp: number
  ttl: number                // Time to live in ms
  staleTime: number          // When to refetch
}

// Connection State
interface ConnectionState {
  status: 'disconnected' | 'connecting' | 'connected' | 'reconnecting'
  lastConnected: number | null
  reconnectAttempts: number
  latency: number            // Round-trip time
}

// Subscription
interface Subscription {
  id: string
  table: string
  filters: Record<string, any>
  callback: (event: UpdateEvent) => void
  active: boolean
}

// Transaction
interface Transaction {
  id: string
  status: 'active' | 'committing' | 'committed' | 'rolled_back'
  queries: string[]
  startTime: number
}
```

---

## Data Flow

### 1. Query Execution Flow

```
User Action (Click Button)
        │
        ▼
Component calls query()
        │
        ▼
Check Cache ──Hit──> Return cached data
        │                     │
        │                     ▼
        │              Update UI (instant)
        │
        └──Miss──> Send HTTP Request
                        │
                        ▼
                   API Gateway
                   (Auth, Rate Limit)
                        │
                        ▼
                Database Server
                (Execute Query)
                        │
                        ▼
                Return Response
                        │
                        ▼
                Store in Cache
                        │
                        ▼
                Update UI
```

### 2. Real-Time Update Flow

```
Database Change (Another User)
        │
        ▼
Pub/Sub Manager notifies
        │
        ▼
WebSocket broadcasts to subscribed clients
        │
        ▼
Client receives WS message
        │
        ▼
Match with active subscriptions
        │
        ▼
Invalidate cache for affected queries
        │
        ▼
Call subscription callbacks
        │
        ▼
Update UI automatically
```

### 3. Transaction Flow

```
User initiates transaction
        │
        ▼
beginTransaction()
        │
        ▼
Server returns transaction ID
        │
        ▼
Execute multiple queries with txn ID
        │
        ├──Query 1 (success)
        ├──Query 2 (success)
        └──Query 3 (error) ──> rollback()
                                    │
                                    ▼
                             All changes undone
        │
        └──All successful──> commit()
                                │
                                ▼
                         Changes persisted
```

---

## State Management Strategy

### Option 1: TanStack Query (Recommended)
**Pros**:
- Built-in caching and cache invalidation
- Automatic background refetching
- Optimistic updates support
- DevTools for debugging

**Structure**:
```
Query Client
├── Query Cache
│   ├── users (stale: false, data: [...])
│   ├── orders (stale: true, refetching: true)
│   └── products (stale: false, data: [...])
├── Mutation Cache
│   └── createUser (status: loading)
└── Default Options
    ├── staleTime: 5000
    ├── cacheTime: 300000
    └── refetchOnWindowFocus: true
```

### Option 2: Redux + Middleware
**Pros**:
- Centralized state management
- Time-travel debugging
- Predictable state updates

**Structure**:
```
Redux Store
├── entities
│   ├── users: { byId: {...}, allIds: [...] }
│   ├── orders: { byId: {...}, allIds: [...] }
│   └── products: { byId: {...}, allIds: [...] }
├── ui
│   ├── loading: { users: false, orders: true }
│   └── errors: { users: null, orders: "timeout" }
└── connection
    ├── status: "connected"
    └── latency: 45
```

### Option 3: Zustand (Lightweight)
**Pros**:
- Minimal boilerplate
- No Context Provider needed
- Simple API

---

## Real-Time Communication

### WebSocket Connection Management

**Connection Lifecycle**:
1. **Initial Connection**: Establish WebSocket with auth token
2. **Heartbeat**: Send ping every 30s, expect pong within 5s
3. **Reconnection**: On disconnect, retry with exponential backoff
   - Attempt 1: 1 second
   - Attempt 2: 2 seconds
   - Attempt 3: 4 seconds
   - Attempt 4: 8 seconds
   - Max: 30 seconds

**Message Queue**:
- Queue outgoing messages during disconnection
- Replay on reconnection
- Max queue size: 100 messages
- Discard oldest if exceeded

**Subscription Management**:
```
Subscription Registry
├── sub_123: { table: "users", filters: {...}, callback: fn }
├── sub_456: { table: "orders", filters: {...}, callback: fn }
└── sub_789: { table: "products", filters: null, callback: fn }

On reconnect: Re-subscribe to all active subscriptions
```

---

## Caching Strategy

### Multi-Level Caching

```
Request Flow:
1. Check Memory Cache (React Query)
   ├── Hit: Return immediately
   └── Miss: Continue

2. Check Session Storage (optional)
   ├── Hit: Restore to memory cache
   └── Miss: Continue

3. Fetch from Server
   ├── Success: Cache in both levels
   └── Error: Return stale data if available
```

### Cache Invalidation Strategies

**1. Time-Based (TTL)**
- Default: 5 minutes
- Configurable per query
- Background refetch when stale

**2. Event-Based**
- WebSocket update → Invalidate related queries
- Mutation success → Invalidate affected queries

**3. Manual**
- User pull-to-refresh
- Explicit invalidate call

### Cache Keys
```
Query Key Structure:
["users", "list", { age: { gt: 18 }, limit: 10 }]
  │       │       └── Parameters (sorted)
  │       └── Operation type
  └── Table name

Invalidation Examples:
- Invalidate all users queries: ["users"]
- Invalidate user lists: ["users", "list"]
- Invalidate specific query: ["users", "list", {...params}]
```

---

## Error Handling & Resilience

### Error Categories

| Error Type | Code | Retry? | User Action |
|------------|------|--------|-------------|
| Network Error | NETWORK_ERROR | Yes | Show retry button |
| Timeout | TIMEOUT | Yes | Increase timeout or retry |
| SQL Syntax | SYNTAX_ERROR | No | Show error message |
| Permission | PERMISSION_DENIED | No | Show access denied |
| Server Error | INTERNAL_ERROR | Yes | Retry with backoff |
| Rate Limit | RATE_LIMIT | Yes | Wait and retry |

### Retry Strategy

**Exponential Backoff**:
```
Attempt 1: Immediate
Attempt 2: 1 second delay
Attempt 3: 2 seconds delay
Attempt 4: 4 seconds delay
Max attempts: 5
```

**Circuit Breaker Pattern**:
```
States: CLOSED → OPEN → HALF_OPEN → CLOSED

CLOSED (normal operation):
  - Allow all requests
  - Track failures
  - If failures > threshold (5 in 10s) → OPEN

OPEN (blocking requests):
  - Reject all requests immediately
  - After timeout (60s) → HALF_OPEN

HALF_OPEN (testing):
  - Allow single request
  - If success → CLOSED
  - If failure → OPEN
```

### Graceful Degradation

**Priority Levels**:
1. **Critical**: Show error, block action
2. **Important**: Show error, allow retry
3. **Optional**: Silent fail, log error

**Fallback Strategies**:
- Show cached data with "outdated" badge
- Display partial results
- Disable real-time updates, show manual refresh button

---

## Security Model

### SQL Injection Prevention

**Always use parameterized queries**:
```
✅ SAFE:
query("SELECT * FROM users WHERE id = ?", [userId])

❌ UNSAFE:
query(`SELECT * FROM users WHERE id = ${userId}`)
```

### Authentication Flow

```
1. User Login
   ├── POST /auth/login with credentials
   └── Server returns JWT token

2. Store Token
   ├── Memory (for requests)
   └── Secure HttpOnly cookie (for refresh)

3. Attach to Requests
   ├── HTTP: Authorization: Bearer <token>
   └── WebSocket: { type: "AUTH", token: "<token>" }

4. Token Refresh
   ├── Before expiry (proactive)
   └── On 401 response (reactive)

5. Token Revocation
   └── On logout or security event
```

### Rate Limiting (Client-Side)

```
Rate Limiter:
├── Max requests: 100 per minute
├── Burst capacity: 20
└── Strategy: Token bucket

If exceeded:
├── Queue request (max 10)
└── Show warning to user
```

### Data Encryption

**In-Transit**:
- TLS 1.3 for all HTTP/WebSocket
- Certificate pinning (mobile apps)

**Sensitive Data**:
- Encrypt before sending (E2E for private data)
- Never log sensitive information

---

## Performance Optimization

### 1. Request Batching
**Problem**: Multiple simultaneous queries create overhead  
**Solution**: Batch multiple queries into single request

```
Batch Window: 10ms

Query 1 arrives ─┐
Query 2 arrives ─┼─ 10ms ──> Send as single request
Query 3 arrives ─┘            [Query1, Query2, Query3]
```

### 2. Pagination Strategy

**Offset-Based** (simple):
```
SELECT * FROM users LIMIT 20 OFFSET 40
```

**Cursor-Based** (efficient):
```
SELECT * FROM users WHERE id > lastSeenId LIMIT 20
```

**Infinite Scroll**:
- Load 20 items initially
- Load next 20 when scrolled to 80%
- Virtual scrolling for 1000+ items

### 3. Query Optimization

**Minimize Data Transfer**:
- Select only needed columns
- Use projection to filter fields
- Compress responses (gzip)

**Example**:
```
❌ SELECT * FROM users
✅ SELECT id, name, email FROM users
```

### 4. Debouncing & Throttling

**Search Input** (debounce):
- Wait 300ms after typing stops
- Cancel previous pending requests

**Scroll Events** (throttle):
- Execute at most once per 100ms
- Prevents excessive API calls

### 5. Prefetching

**Predictive Loading**:
- Prefetch next page on pagination
- Prefetch detail view on list hover
- Prefetch related data in background

---

## Trade-offs & Design Decisions

### 1. REST vs GraphQL vs SQL

| Aspect | REST | GraphQL | Direct SQL |
|--------|------|---------|------------|
| **Flexibility** | Low | High | Highest |
| **Learning Curve** | Low | Medium | High |
| **Over-fetching** | Common | Rare | None |
| **Type Safety** | Manual | Built-in | Manual |
| **Caching** | Easy | Complex | Easy |

**Decision**: Direct SQL with parameterization
- **Pros**: Maximum flexibility, familiar to backend devs
- **Cons**: Security concerns, requires careful design

### 2. WebSocket vs SSE vs Polling

| Aspect | WebSocket | SSE | Long Polling |
|--------|-----------|-----|--------------|
| **Bidirectional** | Yes | No | Yes |
| **Browser Support** | Excellent | Good | Universal |
| **Complexity** | High | Low | Medium |
| **Efficiency** | Highest | High | Low |

**Decision**: WebSocket for real-time
- **Pros**: Bidirectional, efficient, low latency
- **Cons**: More complex, requires connection management

### 3. Optimistic vs Pessimistic Updates

| Approach | UX | Complexity | Risk |
|----------|-----|------------|------|
| **Optimistic** | Instant | High | Rollback needed |
| **Pessimistic** | Delayed | Low | No rollback |

**Decision**: Optimistic for mutations
- **Pros**: Better UX, feels instant
- **Cons**: Must handle rollback on failure

### 4. Client-Side Joins vs Server-Side

| Approach | Network | Processing | Flexibility |
|----------|---------|------------|-------------|
| **Client-Side** | Multiple requests | Client CPU | High |
| **Server-Side** | Single request | Server CPU | Low |

**Decision**: Server-side joins primarily
- **Pros**: Efficient, less network overhead
- **Cons**: Less flexible, server dependency

---

## Scalability Considerations

### Horizontal Scaling
```
Load Balancer
├── API Server 1 ─┐
├── API Server 2 ─┼──> In-Memory DB (Primary)
└── API Server 3 ─┘            │
                               ├──> Replica 1 (Read)
                               └──> Replica 2 (Read)
```

### WebSocket Scaling
- Use sticky sessions (session affinity)
- Redis pub/sub for cross-server messaging
- Connection pooling

---

## Monitoring & Observability

### Key Metrics
- Query latency (p50, p95, p99)
- Cache hit rate
- WebSocket connection count
- Error rate by type
- API request rate

### Logging Strategy
- Client-side error tracking (Sentry)
- Performance monitoring (Web Vitals)
- User session replay (LogRocket)

---

**Document Version**: 2.0  
**Last Updated**: January 2026  
**Focus**: High-Level Architecture & Design
