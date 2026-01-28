# High-Level Design: Elevator Management System
## Frontend Perspective

---

## Table of Contents
1. [Overview](#overview)
2. [Requirements](#requirements)
3. [System Architecture](#system-architecture)
4. [Component Design](#component-design)
5. [Data Models](#data-models)
6. [Elevator Algorithm](#elevator-algorithm)
7. [State Management Strategy](#state-management-strategy)
8. [API Contract](#api-contract)
9. [Real-Time Communication](#real-time-communication)
10. [UI/UX Flow](#uiux-flow)
11. [Performance Optimization](#performance-optimization)
12. [Trade-offs & Design Decisions](#trade-offs--design-decisions)

---

## Overview

A real-time elevator management system for monitoring and controlling multiple elevators in a building, optimizing passenger wait times and system efficiency.

### Key Features
- **Real-Time Monitoring**: Live elevator status tracking
- **Smart Scheduling**: Optimal elevator assignment algorithm
- **Multi-Building Support**: Manage multiple buildings/floors
- **Analytics Dashboard**: Wait times, usage patterns, efficiency metrics
- **Maintenance Mode**: Schedule and track elevator maintenance
- **Emergency Handling**: Priority routing for emergencies

### Use Cases
- Commercial buildings and offices
- Residential high-rises
- Hotels and hospitals
- Shopping malls
- Parking garages

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| F1 | Display real-time status of all elevators | High |
| F2 | Request elevator from any floor | High |
| F3 | Select destination floor inside elevator | High |
| F4 | Optimal elevator assignment algorithm | High |
| F5 | Display estimated arrival time | High |
| F6 | Emergency stop and priority mode | High |
| F7 | Maintenance scheduling | Medium |
| F8 | Usage analytics and reporting | Medium |
| F9 | Door control (open/close/hold) | Medium |
| F10 | Multi-building management | Low |

### Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NF1 | Real-time update latency | < 100ms |
| NF2 | System uptime | 99.99% |
| NF3 | Concurrent users (monitors) | 100+ |
| NF4 | Request processing time | < 50ms |
| NF5 | UI responsiveness | 60fps animations |
| NF6 | Elevator assignment time | < 200ms |

### Constraints
- Maximum floors: 100
- Maximum elevators per building: 20
- Maximum capacity per elevator: 20 people
- Door operation time: 3-5 seconds
- Floor travel time: 2-4 seconds per floor

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                  Frontend Application                         │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Monitoring Dashboard                       │ │
│  │  (Building view, Elevator status, Analytics)            │ │
│  └───────────────────────┬────────────────────────────────┘ │
│                          │                                   │
│  ┌───────────────────────▼────────────────────────────────┐ │
│  │            State Management Layer                      │ │
│  │  ┌──────────┐  ┌───────────┐  ┌─────────────────┐    │ │
│  │  │ Elevator │  │ Request   │  │ Building Config │    │ │
│  │  │ State    │  │ Queue     │  │                 │    │ │
│  │  └──────────┘  └───────────┘  └─────────────────┘    │ │
│  └───────────────────────┬────────────────────────────────┘ │
│                          │                                   │
│  ┌───────────────────────▼────────────────────────────────┐ │
│  │         Business Logic Layer                           │ │
│  │  ┌──────────┐  ┌───────────┐  ┌─────────────────┐    │ │
│  │  │ Scheduler│  │ Algorithm │  │ Validator       │    │ │
│  │  │          │  │ Engine    │  │                 │    │ │
│  │  └──────────┘  └───────────┘  └─────────────────┘    │ │
│  └───────────────────────┬────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
   ┌────────────────┐          ┌─────────────────┐
   │  REST API      │          │  WebSocket      │
   │  (Commands)    │          │  (Real-time)    │
   └────────┬───────┘          └────────┬────────┘
            │                           │
            └───────────┬───────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                 API Gateway / Load Balancer                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Rate Limiter │  │ Auth Guard   │  │ Request Log  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│            Elevator Management Backend                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Scheduler   │  │  Controller  │  │  IoT Gateway │     │
│  │  Service     │  │  Service     │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            State Store (Redis)                      │   │
│  │  (Current positions, requests, status)              │   │
│  └─────────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│              Physical Elevator Controllers                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Elevator 1  │  │  Elevator 2  │  │  Elevator N  │     │
│  │  (Hardware)  │  │  (Hardware)  │  │  (Hardware)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Design

### Component Hierarchy

```
Application
│
├── BuildingSelector
│   ├── BuildingList
│   └── BuildingCard
│
├── ElevatorDashboard
│   │
│   ├── BuildingView
│   │   ├── FloorGrid (Vertical representation)
│   │   ├── ElevatorShaft (×N elevators)
│   │   │   ├── ElevatorCar
│   │   │   │   ├── PositionIndicator
│   │   │   │   ├── DirectionArrow
│   │   │   │   ├── OccupancyIndicator
│   │   │   │   └── StatusBadge
│   │   │   └── RequestMarkers (on floors)
│   │   └── FloorLabels
│   │
│   ├── ControlPanel
│   │   ├── ElevatorSelector
│   │   ├── FloorSelector
│   │   ├── DirectionSelector
│   │   └── EmergencyControls
│   │
│   ├── RequestQueue
│   │   ├── PendingRequests
│   │   ├── InProgressRequests
│   │   └── CompletedRequests
│   │
│   ├── ElevatorDetails (Side Panel)
│   │   ├── CurrentStatus
│   │   ├── CurrentFloor
│   │   ├── DestinationFloors
│   │   ├── Passengers
│   │   ├── LastMaintenance
│   │   └── ControlButtons
│   │       ├── OpenDoor
│   │       ├── CloseDoor
│   │       ├── Emergency
│   │       └── Maintenance
│   │
│   └── Analytics
│       ├── AverageWaitTime
│       ├── TotalTrips
│       ├── ElevatorEfficiency
│       └── PeakHours
│
└── MaintenancePanel
    ├── ScheduledMaintenance
    ├── MaintenanceHistory
    └── AlertsAndWarnings
```

### Key Components

#### 1. BuildingView
**Responsibility**: Visual representation of building and elevator positions

**Features**:
- Vertical floor grid (scrollable for tall buildings)
- Real-time elevator position updates
- Direction indicators (up/down arrows)
- Request markers on floors
- Smooth animations for elevator movement

**Rendering Strategy**:
```
Building Visualization Options:
├── Canvas-based (Best performance)
├── SVG-based (Scalable, accessible)
└── CSS Grid + DOM (Simpler, slower)

Decision: SVG for static structure, CSS animations for movement
```

#### 2. ElevatorCar Component
**Responsibility**: Represent individual elevator state

**Visual States**:
```
Idle        → Gray background, no arrow
Moving Up   → Blue background, ↑ arrow, animated
Moving Down → Blue background, ↓ arrow, animated
Door Open   → Green background, door animation
Error       → Red background, warning icon
Maintenance → Yellow background, wrench icon
Emergency   → Red background, pulsing effect
```

#### 3. ControlPanel
**Responsibility**: Send commands to elevator system

**Actions**:
- Call elevator to specific floor
- Send elevator to floor
- Open/close doors
- Emergency stop
- Enter/exit maintenance mode

#### 4. RequestQueue
**Responsibility**: Display and manage pending elevator requests

**Queue Management**:
```
Request States:
├── PENDING: Waiting for elevator assignment
├── ASSIGNED: Elevator assigned, traveling
├── ARRIVED: Elevator arrived at pickup floor
├── IN_TRANSIT: Passenger in elevator
├── COMPLETED: Passenger reached destination
└── CANCELLED: Request cancelled
```

---

## Data Models

### Core Data Structures

```typescript
// Building Configuration
interface Building {
  id: string
  name: string
  totalFloors: number
  totalElevators: number
  floorHeight: number        // meters
  elevators: Elevator[]
}

// Elevator State
interface Elevator {
  id: string
  buildingId: string
  
  // Position
  currentFloor: number
  targetFloor: number | null
  position: number           // Precise position (0-1 between floors)
  
  // Movement
  status: ElevatorStatus
  direction: Direction
  speed: number             // meters/second
  
  // Capacity
  maxCapacity: number
  currentCapacity: number
  weight: number            // kg
  
  // Door
  doorStatus: DoorStatus
  doorTimer: number | null
  
  // Queue
  destinationQueue: number[]  // Floors to visit
  
  // Metadata
  lastMaintenance: Date
  nextMaintenance: Date
  totalTrips: number
  totalDistance: number      // meters
  isEmergency: boolean
}

// Enums
enum ElevatorStatus {
  IDLE = 'IDLE',
  MOVING_UP = 'MOVING_UP',
  MOVING_DOWN = 'MOVING_DOWN',
  DOOR_OPENING = 'DOOR_OPENING',
  DOOR_OPEN = 'DOOR_OPEN',
  DOOR_CLOSING = 'DOOR_CLOSING',
  MAINTENANCE = 'MAINTENANCE',
  ERROR = 'ERROR',
  EMERGENCY = 'EMERGENCY'
}

enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  NONE = 'NONE'
}

enum DoorStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  OPENING = 'OPENING',
  CLOSING = 'CLOSING'
}

// Elevator Request
interface ElevatorRequest {
  id: string
  buildingId: string
  
  // Request details
  fromFloor: number
  toFloor: number
  direction: Direction
  timestamp: number
  
  // Assignment
  assignedElevatorId: string | null
  estimatedArrivalTime: number | null
  
  // Status
  status: RequestStatus
  priority: Priority
  
  // Metadata
  waitTime: number | null
  tripTime: number | null
}

enum RequestStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED'
}

enum Priority {
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  EMERGENCY = 'EMERGENCY'
}

// Analytics
interface ElevatorAnalytics {
  buildingId: string
  period: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH'
  
  // Performance metrics
  averageWaitTime: number         // seconds
  averageTripTime: number         // seconds
  totalTrips: number
  totalDistance: number           // meters
  
  // Efficiency
  elevatorUtilization: number     // percentage
  peakHours: { hour: number, trips: number }[]
  
  // By elevator
  elevatorMetrics: {
    elevatorId: string
    trips: number
    efficiency: number
    downtime: number            // minutes
  }[]
}
```

### UI State

```typescript
interface UIState {
  // View settings
  selectedBuilding: string | null
  selectedElevator: string | null
  viewMode: 'OVERVIEW' | 'DETAILED' | 'ANALYTICS'
  
  // Filters
  showOnlyActive: boolean
  floorRange: { min: number, max: number }
  
  // Animations
  animationSpeed: number         // 0.5x, 1x, 2x
  enableAnimations: boolean
  
  // Modals
  showMaintenanceModal: boolean
  showEmergencyModal: boolean
  showSettingsModal: boolean
  
  // Real-time status
  connectionStatus: 'CONNECTED' | 'DISCONNECTED' | 'RECONNECTING'
  lastUpdate: number
}
```

---

## Elevator Algorithm

### Dispatch Algorithms

#### 1. FCFS (First-Come-First-Served)
```
Algorithm: Assign requests in order received

Pros:
  - Simple to implement
  - Fair to all requests

Cons:
  - Poor efficiency
  - High average wait time

Use Case: Low-traffic buildings
```

#### 2. Nearest Car (NC)
```
Algorithm: Assign elevator closest to request floor

Steps:
  1. Calculate distance for each elevator
  2. Filter only available elevators
  3. Assign nearest elevator
  4. Update elevator's destination queue

Pros:
  - Better response time than FCFS
  - Simple logic

Cons:
  - Can cause starvation
  - Doesn't consider direction

Use Case: Medium-traffic buildings
```

#### 3. SCAN (Elevator Algorithm) - **Recommended**
```
Algorithm: Each elevator continues in current direction 
until no more requests in that direction

Steps:
  1. Elevator moves in current direction
  2. Pick up all passengers going same direction
  3. Drop off all passengers along the way
  4. When no more requests in direction, reverse
  5. Repeat

Pros:
  - Highly efficient
  - Reduces wait time
  - Industry standard

Cons:
  - More complex implementation
  - Can increase trip time for some passengers

Use Case: High-traffic buildings (RECOMMENDED)
```

#### 4. LOOK (Optimized SCAN)
```
Algorithm: Like SCAN but reverses at last request, 
not at building extremes

Optimization:
  - Don't travel to top/bottom if no requests
  - More efficient than pure SCAN
  - Reduced empty travel

Use Case: Very tall buildings with concentrated traffic
```

#### 5. Destination Dispatch (AI-based)
```
Algorithm: Group passengers by destination, 
optimize overall system efficiency

Features:
  - Assign destination before boarding
  - Group passengers with similar destinations
  - Predict traffic patterns
  - Machine learning optimization

Pros:
  - Maximum system efficiency
  - Reduced wait time
  - Smart handling of peak hours

Cons:
  - Requires advanced control panel
  - Complex implementation
  - Higher cost

Use Case: Modern high-rise buildings
```

### Request Assignment Logic

```
assignElevator(request):
  1. Get all available elevators
     - Status: IDLE, MOVING_UP, MOVING_DOWN
     - Exclude: MAINTENANCE, ERROR, EMERGENCY
  
  2. Calculate score for each elevator:
     score = weightDistance × distance
           + weightDirection × directionScore
           + weightCapacity × capacityScore
           + weightWaitTime × waitTimeScore
  
  3. Filter elevators:
     - Must have capacity
     - Not overloaded
     - Can reach floor within threshold time
  
  4. Select best elevator:
     - Lowest score = best
     - If tie, choose least busy
  
  5. Update elevator queue:
     - Add pickup floor to queue
     - Add destination floor to queue
     - Sort queue by optimal path
  
  6. Return assignment:
     - Elevator ID
     - Estimated arrival time
     - Queue position

Scoring Weights (tunable):
  - weightDistance = 0.4
  - weightDirection = 0.3
  - weightCapacity = 0.2
  - weightWaitTime = 0.1
```

### Destination Queue Optimization

```
optimizeQueue(elevator, newFloor):
  Current approach: SCAN algorithm
  
  If direction is UP:
    1. Add floor to queue
    2. Sort floors in ascending order
    3. Process floors sequentially upward
    4. When no more up requests, reverse
  
  If direction is DOWN:
    1. Add floor to queue
    2. Sort floors in descending order
    3. Process floors sequentially downward
    4. When no more down requests, reverse
  
  If direction is NONE (idle):
    1. Add floor to queue
    2. Set direction based on current position
    3. Start moving

Example:
  Current floor: 5
  Direction: UP
  Current queue: [7, 10, 15]
  New request: Floor 12
  
  Updated queue: [7, 10, 12, 15]
  (Inserted in order, maintains direction)
```

---

## State Management Strategy

### State Architecture

```
Global State (Zustand/Redux):
├── buildings
│   ├── byId: { [id: string]: Building }
│   └── allIds: string[]
│
├── elevators
│   ├── byId: { [id: string]: Elevator }
│   ├── byBuildingId: { [buildingId: string]: string[] }
│   └── allIds: string[]
│
├── requests
│   ├── byId: { [id: string]: ElevatorRequest }
│   ├── pending: string[]
│   ├── inProgress: string[]
│   └── completed: string[]
│
├── analytics
│   ├── currentPeriod: Analytics
│   └── historical: Analytics[]
│
└── ui
    ├── selectedBuilding: string | null
    ├── selectedElevator: string | null
    └── filters: FilterState
```

### State Update Flow

```
Real-Time Update Flow:

1. WebSocket receives elevator update
   │
   ▼
2. Parse and validate message
   │
   ▼
3. Update elevator state in store
   │
   ├─ Position changed?
   │  └─> Trigger animation
   │
   ├─ Floor reached?
   │  ├─> Update request status
   │  ├─> Remove from queue
   │  └─> Calculate next destination
   │
   ├─ Door status changed?
   │  └─> Update UI indicator
   │
   └─ Status changed?
      └─> Update status badge
   │
   ▼
4. UI automatically re-renders (React)
   │
   ▼
5. Update analytics (if significant event)
```

### Action Dispatching

```
State Actions:

Elevator Actions:
├── updateElevatorPosition(elevatorId, position)
├── updateElevatorStatus(elevatorId, status)
├── setElevatorDirection(elevatorId, direction)
├── updateDoorStatus(elevatorId, doorStatus)
├── addToDestinationQueue(elevatorId, floor)
├── removeFromQueue(elevatorId, floor)
└── setMaintenanceMode(elevatorId, enabled)

Request Actions:
├── createRequest(fromFloor, toFloor, priority)
├── assignElevator(requestId, elevatorId)
├── updateRequestStatus(requestId, status)
├── cancelRequest(requestId)
└── completeRequest(requestId)

Control Actions:
├── callElevator(floor, direction)
├── sendElevatorToFloor(elevatorId, floor)
├── openDoors(elevatorId)
├── closeDoors(elevatorId)
├── emergencyStop(elevatorId)
└── startMaintenance(elevatorId)
```

---

## API Contract

### REST Endpoints

```
1. Get Building Configuration
GET /api/buildings/:buildingId

Response: {
  id: "bld_123",
  name: "Tower A",
  totalFloors: 50,
  totalElevators: 8,
  floorHeight: 3.5,
  elevators: [...]
}

2. Get All Elevators
GET /api/buildings/:buildingId/elevators

Response: {
  elevators: [
    {
      id: "elv_001",
      currentFloor: 15,
      status: "MOVING_UP",
      ...
    }
  ]
}

3. Get Elevator Details
GET /api/elevators/:elevatorId

Response: {
  id: "elv_001",
  currentFloor: 15,
  targetFloor: 20,
  status: "MOVING_UP",
  destinationQueue: [16, 18, 20],
  ...
}

4. Call Elevator (Request)
POST /api/requests

Request: {
  buildingId: "bld_123",
  fromFloor: 10,
  toFloor: 25,
  direction: "UP",
  priority: "NORMAL"
}

Response: {
  requestId: "req_456",
  assignedElevatorId: "elv_002",
  estimatedArrivalTime: 45000,  // ms
  queuePosition: 2
}

5. Control Elevator
POST /api/elevators/:elevatorId/control

Request: {
  action: "OPEN_DOOR" | "CLOSE_DOOR" | "EMERGENCY_STOP" | "GO_TO_FLOOR",
  floor?: number,
  reason?: string
}

Response: {
  success: true,
  message: "Door opening"
}

6. Set Maintenance Mode
POST /api/elevators/:elevatorId/maintenance

Request: {
  enabled: true,
  reason: "Scheduled maintenance",
  duration: 3600000  // ms
}

Response: {
  success: true,
  estimatedDowntime: 3600000
}

7. Get Analytics
GET /api/buildings/:buildingId/analytics?period=DAY

Response: {
  period: "DAY",
  averageWaitTime: 25.5,
  totalTrips: 1247,
  peakHours: [...],
  elevatorMetrics: [...]
}
```

### WebSocket Events

#### Client → Server

```typescript
// Subscribe to building updates
{
  type: 'SUBSCRIBE_BUILDING',
  buildingId: 'bld_123'
}

// Request elevator
{
  type: 'REQUEST_ELEVATOR',
  buildingId: 'bld_123',
  fromFloor: 10,
  toFloor: 25,
  priority: 'NORMAL'
}

// Control command
{
  type: 'CONTROL_COMMAND',
  elevatorId: 'elv_001',
  command: 'OPEN_DOOR'
}

// Emergency
{
  type: 'EMERGENCY',
  elevatorId: 'elv_001',
  reason: 'Passenger emergency'
}
```

#### Server → Client

```typescript
// Elevator position update
{
  type: 'ELEVATOR_POSITION',
  elevatorId: 'elv_001',
  currentFloor: 15,
  position: 0.75,        // 75% between floor 15 and 16
  direction: 'UP',
  timestamp: 1642001234567
}

// Status update
{
  type: 'ELEVATOR_STATUS',
  elevatorId: 'elv_001',
  status: 'DOOR_OPENING',
  timestamp: 1642001234567
}

// Floor reached
{
  type: 'FLOOR_REACHED',
  elevatorId: 'elv_001',
  floor: 16,
  nextDestination: 18,
  timestamp: 1642001234567
}

// Request assigned
{
  type: 'REQUEST_ASSIGNED',
  requestId: 'req_456',
  elevatorId: 'elv_002',
  estimatedArrival: 45000,
  timestamp: 1642001234567
}

// Request completed
{
  type: 'REQUEST_COMPLETED',
  requestId: 'req_456',
  actualWaitTime: 42000,
  actualTripTime: 38000,
  timestamp: 1642001234567
}

// Error/Alert
{
  type: 'ALERT',
  severity: 'ERROR' | 'WARNING' | 'INFO',
  elevatorId: 'elv_001',
  message: 'Overweight detected',
  timestamp: 1642001234567
}

// Maintenance notification
{
  type: 'MAINTENANCE_REQUIRED',
  elevatorId: 'elv_001',
  reason: 'Scheduled maintenance due',
  recommendedDowntime: 3600000,
  timestamp: 1642001234567
}
```

---

## Real-Time Communication

### WebSocket Connection Management

```
Connection Lifecycle:

1. CONNECT
   ├─ Authenticate with token
   ├─ Send client metadata
   └─ Receive connection confirmation

2. SUBSCRIBE
   ├─ Subscribe to building(s)
   ├─ Receive current state snapshot
   └─ Start receiving real-time updates

3. HEARTBEAT
   ├─ Send ping every 30s
   ├─ Expect pong within 5s
   └─ Reconnect if timeout

4. UPDATES
   ├─ Receive elevator positions (every 100ms)
   ├─ Receive status changes (immediate)
   └─ Receive request updates (immediate)

5. DISCONNECT
   ├─ Clean disconnect on page unload
   └─ Auto-reconnect on connection loss
```

### Update Frequency Optimization

```
Update Types and Frequencies:

High Frequency (100ms):
├─ Elevator position
├─ Door status
└─ Current floor

Medium Frequency (1s):
├─ Request queue
├─ Wait time estimates
└─ Capacity updates

Low Frequency (5s):
├─ Analytics
├─ System health
└─ Maintenance status

Event-Based (Immediate):
├─ Emergency stop
├─ Floor reached
├─ Request assigned
├─ Door open/close
└─ Status change
```

### Handling Network Issues

```
Network Resilience:

Temporary Disconnect (< 5s):
├─ Show "Reconnecting..." indicator
├─ Buffer outgoing messages
├─ Attempt immediate reconnect
└─ Resume on reconnect

Extended Disconnect (> 5s):
├─ Show "Disconnected" warning
├─ Poll REST API for critical data
├─ Attempt reconnect every 5s
└─ Full state sync on reconnect

Data Sync Strategy:
├─ Request full state snapshot
├─ Compare with local state
├─ Apply server state as source of truth
└─ Notify user of any missed events
```

---

## UI/UX Flow

### User Workflows

#### 1. Calling an Elevator (User Perspective)

```
User Journey:

1. User at Floor 10, wants to go to Floor 25
   │
   ▼
2. User presses UP button on floor panel
   │
   ▼
3. System creates request
   ├─ fromFloor: 10
   ├─ toFloor: null (not yet known)
   └─ direction: UP
   │
   ▼
4. Algorithm assigns optimal elevator
   ├─ Calculates: Elevator 3 is best
   ├─ ETA: 45 seconds
   └─ Queue position: 2nd stop
   │
   ▼
5. User sees notification
   ├─ "Elevator 3 arriving in 45s"
   └─ Visual indicator on panel
   │
   ▼
6. Elevator arrives
   ├─ Door opens automatically
   ├─ User enters
   └─ Beep sound + light indicator
   │
   ▼
7. User presses floor 25 inside
   ├─ System updates request
   └─ toFloor: 25
   │
   ▼
8. Elevator travels to floor 25
   ├─ Stops at any floors in queue
   └─ Shows current floor on display
   │
   ▼
9. Arrives at floor 25
   ├─ Door opens
   ├─ "Floor 25" announcement
   └─ User exits
   │
   ▼
10. Request marked as COMPLETED
```

#### 2. Monitoring Dashboard (Admin Perspective)

```
Admin Workflow:

1. Open Dashboard
   ├─ See all buildings
   └─ Select building

2. View Building
   ├─ See all elevators in real-time
   ├─ Positions, status, direction
   └─ Active requests

3. Monitor Performance
   ├─ Average wait time
   ├─ Active requests count
   └─ Elevator utilization

4. Handle Issues
   ├─ Receive alert (e.g., "Elevator 3 overweight")
   ├─ Click on elevator
   ├─ See details
   └─ Take action (e.g., open door remotely)

5. Schedule Maintenance
   ├─ Select elevator
   ├─ Click "Schedule Maintenance"
   ├─ Set date/time
   └─ System routes around maintenance
```

### Visual Feedback

```
Status Indicators:

Color Coding:
├─ Green: Idle/Normal
├─ Blue: Moving
├─ Yellow: Door operations
├─ Orange: Maintenance
├─ Red: Error/Emergency
└─ Gray: Offline

Animations:
├─ Smooth position transitions (CSS transform)
├─ Arrow pulse for direction
├─ Door open/close animation
├─ Glow effect for selected elevator
└─ Loading spinner for pending requests

Sound Cues (Optional):
├─ Ding on floor arrival
├─ Beep for door closing
├─ Alert sound for emergency
└─ Chime for request assignment
```

### Responsive Layout

```
Desktop (>1200px):
┌─────────────────────────────────────┐
│  Header / Building Selector         │
├────────────┬────────────────────────┤
│  Building  │  Elevator Details      │
│  View      │  + Control Panel       │
│  (Visual)  │                        │
│            ├────────────────────────┤
│            │  Request Queue         │
├────────────┴────────────────────────┤
│  Analytics Dashboard                │
└─────────────────────────────────────┘

Tablet (768-1200px):
┌─────────────────────────────────────┐
│  Header / Tabs                      │
├─────────────────────────────────────┤
│  Building View (Full width)         │
├─────────────────────────────────────┤
│  Controls + Details (Tabs)          │
└─────────────────────────────────────┘

Mobile (<768px):
┌─────────────────┐
│  Header         │
├─────────────────┤
│  Simplified     │
│  Building View  │
├─────────────────┤
│  Bottom Sheet   │
│  (Controls)     │
└─────────────────┘
```

---

## Performance Optimization

### 1. Rendering Optimization

**Virtual Scrolling for Tall Buildings**:
```
Problem: Rendering 100 floors causes performance issues

Solution:
├─ Render only visible floors (viewport + buffer)
├─ Use virtual scrolling library
├─ Typical: Show 20 floors, render 30
└─ Update on scroll

Benefit: Constant performance regardless of floor count
```

**Canvas vs SVG Performance**:
```
Comparison:

Canvas:
├─ Pros: Better for many elevators (>10)
├─ Cons: Less accessible, more complex
└─ Use case: Large buildings with many elevators

SVG:
├─ Pros: Scalable, accessible, easier styling
├─ Cons: Slower with many elements
└─ Use case: Small-medium buildings (<10 elevators)

Recommendation: SVG for most cases, Canvas for scale
```

### 2. State Update Optimization

**Selective Re-rendering**:
```
Optimization Strategies:

1. Component Memoization:
   ├─ React.memo for ElevatorCar
   ├─ Only re-render if props changed
   └─ Prevent cascade re-renders

2. State Selectors:
   ├─ Subscribe only to needed state slices
   ├─ Example: ElevatorCar subscribes to single elevator
   └─ Avoid subscribing to entire elevators array

3. Update Batching:
   ├─ Batch position updates (100ms interval)
   ├─ Don't update on every pixel movement
   └─ Use requestAnimationFrame for smooth animation
```

### 3. WebSocket Optimization

**Message Compression**:
```
Optimization:
├─ Use binary protocol (MessagePack)
├─ Send delta updates (not full state)
├─ Compress position data (2 decimal precision)
└─ Batch non-critical updates

Example:
Before: { elevatorId: "elv_001", currentFloor: 15, position: 0.752341... }
After:  [1, 15, 0.75]  // [elevator index, floor, position]

Bandwidth Reduction: ~70%
```

**Update Throttling**:
```
Strategy:
├─ Critical updates: Immediate (floor reached, emergency)
├─ Position updates: 100ms interval
├─ Analytics: 5s interval
└─ Maintenance: 30s interval

Adaptive Throttling:
├─ Slow connection → Reduce update frequency
├─ High traffic → Prioritize critical updates
└─ Low activity → Full update frequency
```

### 4. Memory Management

```
Memory Optimization:

1. Request History Cleanup:
   ├─ Keep last 100 completed requests
   ├─ Archive older requests to backend
   └─ Clear on building switch

2. Analytics Data:
   ├─ Keep current period in memory
   ├─ Load historical data on demand
   └─ Lazy load charts

3. WebSocket Cleanup:
   ├─ Unsubscribe on component unmount
   ├─ Clear event listeners
   └─ Close connections properly
```

### 5. Bundle Size Optimization

```
Target: < 400KB (gzipped)

Strategies:
├─ Code splitting by route
│   ├─ Dashboard (main)
│   ├─ Analytics (lazy)
│   └─ Maintenance (lazy)
│
├─ Tree shaking
│   └─ Remove unused dependencies
│
├─ Dynamic imports
│   ├─ Chart libraries (lazy)
│   └─ Complex visualizations (lazy)
│
└─ Optimize dependencies
    ├─ Use zustand (3KB) vs Redux (12KB)
    └─ Lightweight date library (date-fns over moment)
```

---

## Trade-offs & Design Decisions

### 1. Elevator Algorithm Selection

| Algorithm | Wait Time | Trip Time | Fairness | Complexity | Decision |
|-----------|-----------|-----------|----------|------------|----------|
| **FCFS** | High | Medium | Excellent | Low | ❌ Too inefficient |
| **Nearest Car** | Medium | Medium | Good | Low | ✅ For small buildings |
| **SCAN** | Low | Medium | Good | Medium | ✅ **Recommended** |
| **LOOK** | Low | Low | Good | Medium | ✅ For tall buildings |
| **Destination Dispatch** | Lowest | Lowest | Fair | High | 🔄 Future enhancement |

**Decision**: **SCAN** for standard implementation, **LOOK** for tall buildings
- Best balance of efficiency and implementation complexity
- Industry-proven algorithm
- Handles peak traffic well

---

### 2. Real-Time vs Polling

| Aspect | WebSocket | Polling |
|--------|-----------|---------|
| **Latency** | <100ms | 1-5s |
| **Server Load** | Low | High |
| **Complexity** | High | Low |
| **Bi-directional** | Yes | No |
| **Firewall Issues** | Possible | Rare |

**Decision**: ✅ **WebSocket** for real-time updates
- Essential for smooth elevator position tracking
- Lower server load than polling
- Fallback to polling if WebSocket fails

---

### 3. State Management

| Option | Bundle Size | Learning Curve | Performance | Decision |
|--------|-------------|----------------|-------------|----------|
| **Redux Toolkit** | ~12KB | Medium | Good | For complex apps |
| **Zustand** | ~3KB | Low | Excellent | ✅ **Recommended** |
| **MobX** | ~16KB | High | Excellent | Too complex |
| **Context + useReducer** | 0KB | Low | Poor for large state | Too basic |

**Decision**: ✅ **Zustand**
- Minimal boilerplate
- Excellent performance
- Perfect fit for elevator state management

---

### 4. Rendering Technology

| Technology | Scalability | Performance | Accessibility | Decision |
|------------|-------------|-------------|---------------|----------|
| **SVG** | Excellent | Good | Excellent | ✅ **Recommended** |
| **Canvas** | Good | Excellent | Poor | For many elevators |
| **CSS + DOM** | Poor | Poor | Excellent | Too slow |
| **WebGL** | Excellent | Excellent | Poor | Overkill |

**Decision**: ✅ **SVG** primary, **Canvas** for scale
- SVG for most buildings (<10 elevators)
- Canvas for large deployments (>10 elevators)
- Better accessibility and maintainability

---

### 5. Animation Strategy

| Approach | Smoothness | Performance | Complexity | Decision |
|----------|------------|-------------|------------|----------|
| **CSS Transitions** | Good | Excellent | Low | ✅ For simple movements |
| **RequestAnimationFrame** | Excellent | Good | Medium | ✅ For position tracking |
| **Animation Libraries** | Excellent | Medium | Low | ❌ Unnecessary overhead |
| **Web Animations API** | Excellent | Excellent | Medium | 🔄 Future consideration |

**Decision**: Hybrid approach
- CSS transitions for door animations, status changes
- requestAnimationFrame for smooth position tracking
- No external animation libraries (reduce bundle)

---

### 6. Door Operation Strategy

**Open Door Duration Decision**:
```
Options:

Fixed Duration (3-5s):
├─ Pros: Simple, predictable
├─ Cons: May close on passengers
└─ Use: Standard operation

Sensor-Based:
├─ Pros: Safe, user-friendly
├─ Cons: Requires hardware sensors
└─ Use: Modern elevators

Manual Override:
├─ Pros: User control
├─ Cons: Can delay system
└─ Use: Accessible elevators

Decision: Fixed duration (5s) + manual "door open" button
```

---

### 7. Capacity Management

**Overweight Handling**:
```
Strategies:

Option 1: Reject Boarding
├─ Door stays open
├─ Audio/visual alert
├─ Wait for passenger(s) to exit
└─ Cannot move until under capacity

Option 2: Warning System
├─ Visual warning
├─ Allow brief overweight
├─ Audio reminder
└─ Trust passengers to self-regulate

Decision: ✅ Option 1 (Safety first)
- Cannot compromise on safety
- Clear feedback to passengers
- Prevents equipment damage
```

---

### 8. Emergency Handling

**Priority Levels**:
```
Emergency Types:

P0 - Critical Emergency:
├─ Fire alarm
├─ Medical emergency
├─ Earthquake
└─ Action: All elevators to ground floor, stop service

P1 - High Priority:
├─ Passenger emergency button
├─ Door stuck
└─ Action: Stop elevator, notify authorities

P2 - Medium Priority:
├─ Overweight
├─ Long door open time
└─ Action: Alert only, allow operation

P3 - Low Priority:
├─ Maintenance due soon
├─ Efficiency warnings
└─ Action: Log for review
```

---

## Scalability Considerations

### Horizontal Scaling

```
Architecture for Scale:

Load Balancer
├─ WebSocket Server 1 (Buildings 1-10)
├─ WebSocket Server 2 (Buildings 11-20)
└─ WebSocket Server N
        │
        ├─ Redis Pub/Sub (Cross-server events)
        └─ Shared State Store (Elevator positions)

Capacity Per Server:
├─ 100 buildings
├─ 2000 elevators
├─ 10,000 concurrent WebSocket connections
└─ 1000 requests/second
```

### Database Strategy

```
Data Storage:

Real-Time Data (Redis):
├─ Current elevator positions
├─ Active requests
├─ System status
└─ TTL: 1 hour

Historical Data (PostgreSQL):
├─ Completed requests
├─ Analytics data
├─ Maintenance logs
└─ User actions

Cold Storage (S3):
├─ Old analytics (>1 year)
├─ Archived logs
└─ Compliance data
```

---

## Monitoring & Alerts

### Key Metrics

```
System Metrics:
├─ Average wait time (target: <30s)
├─ Average trip time (target: <60s)
├─ Elevator availability (target: >99%)
├─ Request success rate (target: >99.9%)
└─ WebSocket connection stability

Performance Metrics:
├─ UI responsiveness (target: 60fps)
├─ WebSocket latency (target: <100ms)
├─ State update frequency
└─ Memory usage

Business Metrics:
├─ Peak hour traffic
├─ Most used elevators
├─ Most traveled floors
└─ Maintenance frequency
```

### Alert System

```
Alert Priorities:

Critical (Immediate):
├─ Elevator stuck
├─ Emergency button pressed
├─ System outage
└─ Action: SMS + Phone call + Dashboard alert

High (5 minutes):
├─ Elevator offline
├─ Overweight for >1 minute
├─ Long wait time (>2 minutes)
└─ Action: Dashboard alert + Email

Medium (15 minutes):
├─ Maintenance due
├─ Unusual traffic pattern
├─ Low efficiency
└─ Action: Dashboard notification

Low (Daily digest):
├─ Usage statistics
├─ Performance summary
└─ Action: Email report
```

---

## Security Considerations

### Access Control

```
User Roles:

Admin:
├─ Full system access
├─ Control all elevators
├─ Schedule maintenance
└─ View analytics

Operator:
├─ Monitor elevators
├─ Basic controls (open/close doors)
├─ Create reports
└─ Cannot schedule maintenance

Maintenance:
├─ View elevator status
├─ Put elevator in maintenance mode
├─ View maintenance history
└─ Cannot control during operation

Viewer:
├─ Read-only access
├─ View dashboard
├─ View analytics
└─ No control permissions
```

### API Security

```
Security Layers:

1. Authentication:
   ├─ JWT tokens
   ├─ Token expiration (1 hour)
   └─ Refresh tokens (7 days)

2. Authorization:
   ├─ Role-based access control (RBAC)
   ├─ Permission checks on every action
   └─ Audit logging

3. Rate Limiting:
   ├─ 100 requests/minute per user
   ├─ 1000 WebSocket messages/minute
   └─ Throttle on abuse

4. Input Validation:
   ├─ Floor range validation
   ├─ Elevator ID validation
   └─ Sanitize all inputs

5. Secure WebSocket:
   ├─ WSS (WebSocket Secure)
   ├─ Token-based authentication
   └─ Connection limit per user
```

---

## Testing Strategy

### Test Coverage

```
Unit Tests:
├─ Algorithm logic (SCAN, assignment)
├─ State management actions
├─ Utility functions
└─ Data transformations

Integration Tests:
├─ Component interactions
├─ WebSocket event handling
├─ API request/response flow
└─ State synchronization

E2E Tests:
├─ Complete user flows
├─ Multi-elevator scenarios
├─ Emergency handling
└─ Maintenance mode

Performance Tests:
├─ Load testing (1000 concurrent connections)
├─ Stress testing (peak traffic simulation)
├─ Animation performance (60fps check)
└─ Memory leak detection
```

---

## Future Enhancements

### Phase 2 Features
1. **Predictive Maintenance**: ML-based failure prediction
2. **Traffic Prediction**: AI-powered demand forecasting
3. **Energy Optimization**: Smart scheduling for power saving
4. **Mobile App**: Native iOS/Android apps
5. **Voice Control**: Alexa/Google Assistant integration

### Phase 3 Features
1. **AR Visualization**: AR view of elevator internals
2. **Blockchain Logging**: Immutable audit trail
3. **Quantum Scheduling**: Advanced optimization algorithms
4. **IoT Integration**: Smart building integration
5. **Carbon Tracking**: Environmental impact monitoring

---

## Technology Stack Summary

```
Frontend:
├─ React 18+
├─ TypeScript
├─ Zustand (State management)
├─ SVG + CSS (Rendering)
├─ WebSocket API (Real-time)
└─ Recharts (Analytics visualization)

Backend:
├─ Node.js + Express
├─ Socket.io (WebSocket server)
├─ Redis (Real-time state)
├─ PostgreSQL (Historical data)
└─ Bull (Job queue for maintenance)

DevOps:
├─ Vite (Build tool)
├─ Vitest (Unit testing)
├─ Playwright (E2E testing)
├─ Prometheus (Monitoring)
└─ Grafana (Dashboards)
```

---

**Document Version**: 1.0  
**Last Updated**: January 2026  
**Focus**: High-Level Architecture & Design Decisions
