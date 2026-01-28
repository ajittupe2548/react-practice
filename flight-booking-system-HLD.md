# High-Level Design: Flight Booking System
## Frontend Perspective

---

## Table of Contents
1. [Overview](#overview)
2. [Requirements](#requirements)
3. [System Architecture](#system-architecture)
4. [Component Design](#component-design)
5. [Data Models](#data-models)
6. [Core Algorithms](#core-algorithms)
7. [State Management Strategy](#state-management-strategy)
8. [API Contract](#api-contract)
9. [Real-Time Features](#real-time-features)
10. [Payment Flow](#payment-flow)
11. [UI/UX Flow](#uiux-flow)
12. [Performance Optimization](#performance-optimization)
13. [Trade-offs & Design Decisions](#trade-offs--design-decisions)

---

## Overview

A comprehensive flight booking platform that enables users to search, compare, and book flights with real-time seat availability, dynamic pricing, and secure payment processing.

### Key Features
- **Flight Search**: Multi-city, round-trip, one-way searches with filters
- **Price Comparison**: Compare prices across dates and airlines
- **Real-Time Availability**: Live seat availability and pricing updates
- **Seat Selection**: Interactive seat map with preferences
- **Multi-Passenger Booking**: Group bookings with different passenger types
- **Payment Processing**: Secure payment with multiple methods
- **Booking Management**: View, modify, cancel bookings
- **Check-in**: Online check-in and boarding pass generation
- **Fare Calendar**: Best price finder across date ranges

### Use Cases
- Individual travelers booking flights
- Travel agencies managing multiple bookings
- Corporate travel booking
- Group travel coordination
- Last-minute flight bookings

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| F1 | Search flights by origin, destination, dates | High |
| F2 | Filter and sort search results | High |
| F3 | View flight details (schedule, price, airline) | High |
| F4 | Select seats from interactive seat map | High |
| F5 | Add multiple passengers with details | High |
| F6 | Calculate total price with taxes and fees | High |
| F7 | Process payments securely | High |
| F8 | Generate booking confirmation and e-tickets | High |
| F9 | View and manage bookings | High |
| F10 | Modify/cancel bookings with refund calculation | High |
| F11 | Online check-in (24hrs before departure) | Medium |
| F12 | Multi-city and round-trip bookings | High |
| F13 | Fare alerts and price tracking | Medium |
| F14 | Loyalty program integration | Low |
| F15 | Travel insurance add-on | Low |

### Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NF1 | Search response time | < 2s |
| NF2 | Booking completion time | < 30s |
| NF3 | Payment processing time | < 5s |
| NF4 | Concurrent users | 100,000+ |
| NF5 | System availability | 99.99% |
| NF6 | Data accuracy | 100% for pricing/seats |
| NF7 | PCI-DSS compliance | Required |
| NF8 | Mobile responsiveness | All devices |

### Constraints
- Seat hold time: 15 minutes
- Price lock time: 10 minutes
- Maximum passengers per booking: 9
- Booking modification: Up to 24hrs before departure
- Refund processing: 7-14 business days
- Search results: Up to 100 flights

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                  Frontend Application                         │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Presentation Layer                             │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │ │
│  │  │ Search   │  │ Results  │  │  Booking Flow    │    │ │
│  │  │ Widget   │  │ Display  │  │  (Multi-step)    │    │ │
│  │  └──────────┘  └──────────┘  └──────────────────┘    │ │
│  └───────────────────────┬────────────────────────────────┘ │
│                          │                                   │
│  ┌───────────────────────▼────────────────────────────────┐ │
│  │         State Management Layer                         │ │
│  │  ┌──────────┐  ┌───────────┐  ┌─────────────────┐    │ │
│  │  │ Search   │  │ Booking   │  │ User & Auth     │    │ │
│  │  │ Results  │  │ State     │  │                 │    │ │
│  │  └──────────┘  └───────────┘  └─────────────────┘    │ │
│  └───────────────────────┬────────────────────────────────┘ │
│                          │                                   │
│  ┌───────────────────────▼────────────────────────────────┐ │
│  │       Business Logic Layer                             │ │
│  │  ┌──────────┐  ┌───────────┐  ┌─────────────────┐    │ │
│  │  │ Price    │  │ Seat      │  │ Validation      │    │ │
│  │  │ Calculator│  │ Selector  │  │ Rules           │    │ │
│  │  └──────────┘  └───────────┘  └─────────────────┘    │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬─────────────────────────────────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
            ▼                         ▼
   ┌────────────────┐        ┌────────────────┐
   │  REST API      │        │  WebSocket     │
   │  (Search,      │        │  (Real-time    │
   │   Booking)     │        │   Updates)     │
   └────────┬───────┘        └────────┬───────┘
            │                         │
            └────────────┬────────────┘
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                 API Gateway                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Rate Limiter │  │ Auth (JWT)   │  │ API Router   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬─────────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────────┐
│              Backend Microservices                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Flight      │  │  Booking     │  │  Payment     │      │
│  │  Search      │  │  Service     │  │  Service     │      │
│  │  Service     │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Inventory   │  │  Pricing     │  │  Notification│      │
│  │  Service     │  │  Service     │  │  Service     │      │
│  │  (Seats)     │  │  (Dynamic)   │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬─────────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────────┐
│              External Integrations                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Airline     │  │  Payment     │  │  Email/SMS   │      │
│  │  GDS/APIs    │  │  Gateway     │  │  Service     │      │
│  │  (Amadeus)   │  │  (Stripe)    │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Design

### Component Hierarchy

```
Application
│
├── Authentication
│   ├── Login
│   ├── Register
│   ├── SocialLogin (Google, Facebook)
│   └── ForgotPassword
│
├── FlightSearch
│   ├── SearchWidget
│   │   ├── TripType (One-way, Round-trip, Multi-city)
│   │   ├── LocationSelector (Autocomplete)
│   │   │   ├── OriginInput
│   │   │   └── DestinationInput
│   │   ├── DatePicker
│   │   │   ├── DepartureDate
│   │   │   └── ReturnDate (conditional)
│   │   ├── PassengerSelector
│   │   │   ├── AdultCount
│   │   │   ├── ChildCount
│   │   │   └── InfantCount
│   │   ├── ClassSelector (Economy, Business, First)
│   │   └── SearchButton
│   │
│   ├── FareCalendar
│   │   └── PriceGrid (Date vs Price)
│   │
│   └── RecentSearches
│
├── SearchResults
│   ├── ResultsHeader
│   │   ├── ResultsCount
│   │   ├── SortOptions
│   │   │   ├── PriceLowToHigh
│   │   │   ├── Duration
│   │   │   ├── DepartureTime
│   │   │   └── Airline
│   │   └── ViewToggle (List/Grid)
│   │
│   ├── Filters
│   │   ├── PriceRange
│   │   ├── Airlines
│   │   ├── Stops (Non-stop, 1 stop, 2+ stops)
│   │   ├── DepartureTime
│   │   ├── ArrivalTime
│   │   ├── Duration
│   │   ├── Airports
│   │   └── ClearFilters
│   │
│   ├── FlightList
│   │   └── FlightCard (×N)
│   │       ├── AirlineInfo (Logo, Name, Flight#)
│   │       ├── FlightRoute
│   │       │   ├── DepartureInfo (Time, Airport)
│   │       │   ├── DurationBar (with stops)
│   │       │   └── ArrivalInfo (Time, Airport)
│   │       ├── PriceBreakdown
│   │       │   ├── BasePrice
│   │       │   ├── TaxesFees
│   │       │   └── TotalPrice
│   │       ├── ClassBadges (Economy, Business)
│   │       ├── SeatsAvailable
│   │       └── SelectButton
│   │
│   ├── FlightDetails (Modal/Expandable)
│   │   ├── FlightSegments
│   │   ├── LayoverInfo
│   │   ├── BaggageAllowance
│   │   ├── FareRules
│   │   └── Amenities
│   │
│   └── NoResults (Empty state)
│
├── BookingFlow (Multi-step)
│   │
│   ├── Step1: ReviewFlight
│   │   ├── FlightSummary
│   │   ├── FareBreakdown
│   │   └── ModifySearch
│   │
│   ├── Step2: PassengerDetails
│   │   ├── PassengerForm (×N passengers)
│   │   │   ├── Title (Mr/Ms/Mrs)
│   │   │   ├── FirstName
│   │   │   ├── LastName
│   │   │   ├── DateOfBirth
│   │   │   ├── Gender
│   │   │   ├── Nationality
│   │   │   └── PassportInfo (International)
│   │   ├── ContactInfo
│   │   │   ├── Email
│   │   │   ├── Phone
│   │   │   └── EmergencyContact
│   │   └── SavedProfiles (Frequent travelers)
│   │
│   ├── Step3: SeatSelection
│   │   ├── SeatMap (Interactive)
│   │   │   ├── SeatGrid (Rows × Columns)
│   │   │   ├── SeatLegend
│   │   │   │   ├── Available
│   │   │   │   ├── Selected
│   │   │   │   ├── Occupied
│   │   │   │   ├── Extra Legroom ($)
│   │   │   │   └── Exit Row ($)
│   │   │   └── SeatTooltip (On hover)
│   │   ├── SelectedSeats (Summary)
│   │   └── SkipSeatSelection
│   │
│   ├── Step4: AddOns
│   │   ├── BaggageOptions
│   │   │   ├── CheckedBag (Per bag)
│   │   │   └── ExtraBaggage
│   │   ├── MealPreferences
│   │   ├── TravelInsurance
│   │   └── PriorityBoarding
│   │
│   ├── Step5: ReviewAndPay
│   │   ├── BookingSummary
│   │   │   ├── FlightDetails
│   │   │   ├── PassengerList
│   │   │   ├── SelectedSeats
│   │   │   ├── AddOns
│   │   │   └── PriceBreakdown
│   │   ├── PaymentMethod
│   │   │   ├── CreditCard
│   │   │   ├── DebitCard
│   │   │   ├── PayPal
│   │   │   ├── WalletPayment
│   │   │   └── BankTransfer
│   │   ├── CardDetails (if card payment)
│   │   │   ├── CardNumber
│   │   │   ├── CardHolder
│   │   │   ├── ExpiryDate
│   │   │   └── CVV
│   │   ├── BillingAddress
│   │   ├── ApplyCoupon
│   │   └── TermsAndConditions
│   │
│   └── Step6: Confirmation
│       ├── SuccessMessage
│       ├── BookingReference (PNR)
│       ├── ETicket (Download/Email)
│       ├── BookingSummary
│       └── NextSteps
│           ├── AddToCalendar
│           ├── OnlineCheckIn (link)
│           └── ManageBooking
│
├── MyBookings
│   ├── BookingsList
│   │   ├── UpcomingTrips
│   │   ├── PastTrips
│   │   └── CancelledTrips
│   ├── BookingCard (×N)
│   │   ├── BookingReference
│   │   ├── FlightInfo
│   │   ├── PassengerCount
│   │   ├── Status (Confirmed, Checked-in, etc.)
│   │   └── Actions
│   │       ├── ViewDetails
│   │       ├── CheckIn (if eligible)
│   │       ├── Modify
│   │       └── Cancel
│   └── BookingDetails
│       ├── FlightItinerary
│       ├── PassengerDetails
│       ├── PaymentInfo
│       ├── ETicket
│       └── ModificationHistory
│
├── CheckIn
│   ├── BookingLookup (PNR + Last name)
│   ├── PassengerList (Select passengers)
│   ├── SeatSelection (if not selected)
│   ├── BaggageDeclaration
│   ├── TravelDocuments (Verify)
│   ├── BoardingPass (Generate)
│   └── CheckInConfirmation
│
├── UserAccount
│   ├── Profile
│   │   ├── PersonalInfo
│   │   ├── TravelDocuments
│   │   ├── FrequentFlyerPrograms
│   │   └── PaymentMethods
│   ├── TravelPreferences
│   ├── Notifications
│   └── PriceAlerts
│
└── Support
    ├── FAQ
    ├── ContactUs
    ├── LiveChat
    └── RefundStatus
```

### Key Components

#### 1. FlightCard
**Responsibility**: Display flight option in search results

**Information Architecture**:
```
┌─────────────────────────────────────────────────────┐
│ [Logo] Airline Name               Flight#: AB123    │
│                                                     │
│ 10:00 AM ────────────────────────> 2:30 PM        │
│ JFK (New York)    4h 30m (1 stop)    LAX (LA)     │
│                    via ORD (45min)                  │
│                                                     │
│ Economy • 8 seats left                              │
│                                                     │
│ $459  [View Details]  [Select] ──────────────────> │
└─────────────────────────────────────────────────────┘
```

#### 2. SeatMap Component
**Responsibility**: Interactive seat selection

**Layout**:
```
     A  B  C    D  E  F
 1  [X][X][✓]  [○][○][○]   Exit Row +$30
 2  [X][○][○]  [○][○][X]
 3  [○][○][○]  [○][○][○]
 ...
15  [○][○][○]  [○][○][○]   Extra Legroom +$20

Legend:
[X] - Occupied
[○] - Available
[✓] - Selected by you
[$] - Premium (extra cost)
```

#### 3. PriceBreakdown Component
**Responsibility**: Transparent pricing display

```
Flight Details:
  Base Fare (2 passengers)      $800.00
  Taxes & Fees                   $120.00
  
Add-Ons:
  Seat Selection (2 seats)        $40.00
  Checked Baggage (2 bags)        $60.00
  Travel Insurance                $25.00
  
──────────────────────────────────────
Total                           $1,045.00
```

---

## Data Models

### Core Entities

```typescript
// Flight
interface Flight {
  id: string
  flightNumber: string
  airline: Airline
  aircraft: Aircraft
  
  // Route
  origin: Airport
  destination: Airport
  departureTime: Date
  arrivalTime: Date
  duration: number          // minutes
  
  // Segments (for connecting flights)
  segments: FlightSegment[]
  
  // Pricing
  fareClasses: FareClass[]
  
  // Status
  status: FlightStatus
  
  // Capacity
  totalSeats: number
  availableSeats: number
  
  // Rules
  baggageAllowance: BaggageAllowance
  fareRules: FareRules
}

interface FlightSegment {
  segmentNumber: number
  flightNumber: string
  origin: Airport
  destination: Airport
  departureTime: Date
  arrivalTime: Date
  duration: number
  aircraft: Aircraft
}

interface Airline {
  code: string              // e.g., "AA"
  name: string              // e.g., "American Airlines"
  logo: string              // URL
  rating: number            // 1-5 stars
}

interface Airport {
  code: string              // IATA code, e.g., "JFK"
  name: string
  city: string
  country: string
  timezone: string
  coordinates: { lat: number, lng: number }
}

interface Aircraft {
  code: string              // e.g., "738" (Boeing 737-800)
  name: string
  seatConfiguration: SeatConfiguration
}

// Fare Classes
interface FareClass {
  class: CabinClass
  fareType: FareType
  price: Price
  availableSeats: number
  fareBasis: string         // Airline-specific code
  fareRules: FareRules
}

enum CabinClass {
  ECONOMY = 'ECONOMY',
  PREMIUM_ECONOMY = 'PREMIUM_ECONOMY',
  BUSINESS = 'BUSINESS',
  FIRST_CLASS = 'FIRST_CLASS'
}

enum FareType {
  BASIC = 'BASIC',           // No changes, no refund
  STANDARD = 'STANDARD',     // Changes with fee
  FLEXIBLE = 'FLEXIBLE',     // Free changes
  FULLY_REFUNDABLE = 'FULLY_REFUNDABLE'
}

interface Price {
  amount: number
  currency: string
  baseFare: number
  taxes: number
  fees: number
  total: number
}

enum FlightStatus {
  SCHEDULED = 'SCHEDULED',
  DELAYED = 'DELAYED',
  DEPARTED = 'DEPARTED',
  ARRIVED = 'ARRIVED',
  CANCELLED = 'CANCELLED',
  DIVERTED = 'DIVERTED'
}

// Booking
interface Booking {
  id: string
  pnr: string               // Passenger Name Record (6-char code)
  status: BookingStatus
  
  // Flight details
  flights: Flight[]         // Outbound + Return (if round-trip)
  
  // Passengers
  passengers: Passenger[]
  
  // Contact
  contactInfo: ContactInfo
  
  // Seats
  seatAssignments: SeatAssignment[]
  
  // Pricing
  pricing: BookingPricing
  
  // Payment
  payment: PaymentInfo
  
  // Add-ons
  addOns: AddOn[]
  
  // Audit
  createdAt: Date
  bookedBy: string          // User ID
  modifiedAt?: Date
  cancelledAt?: Date
}

enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

interface Passenger {
  id: string
  type: PassengerType
  title: string             // Mr, Ms, Mrs, Dr
  firstName: string
  lastName: string
  dateOfBirth: Date
  gender: string
  nationality: string
  
  // Travel documents
  passportNumber?: string
  passportExpiry?: Date
  passportCountry?: string
  
  // Frequent flyer
  frequentFlyerNumber?: string
  frequentFlyerAirline?: string
  
  // Special requests
  specialMeals?: string[]
  wheelchairAssistance?: boolean
  medicalConditions?: string
}

enum PassengerType {
  ADULT = 'ADULT',           // 12+ years
  CHILD = 'CHILD',           // 2-11 years
  INFANT = 'INFANT'          // 0-2 years
}

interface ContactInfo {
  email: string
  phone: string
  countryCode: string
  alternatePhone?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

// Seat Selection
interface SeatAssignment {
  passengerId: string
  flightId: string
  seatNumber: string
  seatClass: CabinClass
  seatType: SeatType
  price: number
}

enum SeatType {
  STANDARD = 'STANDARD',
  EXTRA_LEGROOM = 'EXTRA_LEGROOM',
  EXIT_ROW = 'EXIT_ROW',
  WINDOW = 'WINDOW',
  AISLE = 'AISLE',
  MIDDLE = 'MIDDLE'
}

interface SeatConfiguration {
  rows: number
  columns: string[]         // e.g., ['A', 'B', 'C', 'D', 'E', 'F']
  aisles: number[]          // Column indices where aisles are
  exitRows: number[]
  seats: Seat[]
}

interface Seat {
  seatNumber: string        // e.g., "12A"
  row: number
  column: string
  type: SeatType
  available: boolean
  price: number
  restrictions?: string[]   // e.g., "No infants", "Must be 15+"
}

// Pricing
interface BookingPricing {
  baseFare: number
  taxes: number
  fees: number
  seatCharges: number
  baggageCharges: number
  addOnCharges: number
  discount: number
  total: number
  currency: string
  
  // Breakdown per passenger
  passengerBreakdown: {
    passengerId: string
    baseFare: number
    taxes: number
  }[]
}

// Payment
interface PaymentInfo {
  paymentId: string
  method: PaymentMethod
  amount: number
  currency: string
  status: PaymentStatus
  transactionId: string
  timestamp: Date
  
  // Card details (masked)
  last4Digits?: string
  cardBrand?: string
}

enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  WALLET = 'WALLET',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

// Add-ons
interface AddOn {
  type: AddOnType
  description: string
  price: number
  quantity: number
  passengerId?: string      // If passenger-specific
}

enum AddOnType {
  CHECKED_BAGGAGE = 'CHECKED_BAGGAGE',
  EXTRA_BAGGAGE = 'EXTRA_BAGGAGE',
  MEAL = 'MEAL',
  TRAVEL_INSURANCE = 'TRAVEL_INSURANCE',
  PRIORITY_BOARDING = 'PRIORITY_BOARDING',
  LOUNGE_ACCESS = 'LOUNGE_ACCESS'
}

// Search
interface SearchCriteria {
  tripType: TripType
  origin: string            // Airport code
  destination: string
  departureDate: Date
  returnDate?: Date
  passengers: PassengerCount
  cabinClass: CabinClass
  directFlightsOnly: boolean
  flexibleDates: boolean    // ±3 days
}

enum TripType {
  ONE_WAY = 'ONE_WAY',
  ROUND_TRIP = 'ROUND_TRIP',
  MULTI_CITY = 'MULTI_CITY'
}

interface PassengerCount {
  adults: number
  children: number
  infants: number
}

// Filters
interface SearchFilters {
  priceRange: { min: number, max: number }
  airlines: string[]
  stops: StopFilter
  departureTimeRange: TimeRange
  arrivalTimeRange: TimeRange
  durationMax: number       // minutes
  airports: string[]
}

enum StopFilter {
  ANY = 'ANY',
  NON_STOP = 'NON_STOP',
  ONE_STOP = 'ONE_STOP',
  TWO_PLUS_STOPS = 'TWO_PLUS_STOPS'
}

interface TimeRange {
  start: string             // HH:mm format
  end: string
}
```

---

## Core Algorithms

### 1. Flight Search & Filtering

```
searchFlights(criteria, filters):
  
  1. Build search query:
     - Origin & destination airports
     - Date range (exact or flexible ±3 days)
     - Passenger count and types
     - Cabin class
  
  2. Query flight database/API:
     - Search direct flights
     - Search connecting flights (max 2 stops)
     - Apply cabin class filter
  
  3. Calculate pricing:
     For each flight:
       - Get base fare for cabin class
       - Calculate taxes (7-20% of base fare)
       - Add airport fees
       - Apply passenger-type discounts (children, infants)
  
  4. Apply filters:
     - Price range
     - Airlines
     - Number of stops
     - Departure/arrival time
     - Duration
     - Airports
  
  5. Sort results:
     Default: Best value (price + duration + stops)
     Options: Price, Duration, Departure time
  
  6. Return top 100 results

Complexity: O(N log N) where N = matching flights
Optimization: Index on (origin, destination, date)
```

### 2. Seat Availability Check

```
checkSeatAvailability(flightId, cabinClass):
  
  1. Get seat configuration for aircraft
  
  2. Query booked seats:
     - Get all seat assignments for flight
     - Group by cabin class
  
  3. Calculate availability:
     For each seat in cabin class:
       If seat NOT in booked_seats:
         Mark as available
       Else:
         Mark as occupied
  
  4. Apply business rules:
     - Block seats for operational reasons
     - Block seats near emergency exits (restrictions)
     - Block last row if aircraft not full
  
  5. Calculate premium seats:
     - Extra legroom: Rows with more pitch
     - Exit rows: Emergency exit rows
     - Apply surcharge pricing
  
  6. Return seat map with availability

Real-time: Update via WebSocket on every booking
Cache: 30 seconds TTL per flight
```

### 3. Dynamic Pricing Algorithm

```
calculatePrice(flight, cabinClass, bookingDate, travelDate):
  
  1. Get base fare:
     baseFare = fareClasses[cabinClass].basePrice
  
  2. Apply time-to-departure multiplier:
     daysUntilDeparture = travelDate - bookingDate
     
     If daysUntilDeparture <= 7:
       multiplier = 1.5           // Last minute premium
     Else if daysUntilDeparture <= 14:
       multiplier = 1.3
     Else if daysUntilDeparture <= 30:
       multiplier = 1.1
     Else:
       multiplier = 1.0           // Advance booking
  
  3. Apply demand factor:
     loadFactor = bookedSeats / totalSeats
     
     If loadFactor > 0.9:
       demandMultiplier = 1.4     // High demand
     Else if loadFactor > 0.7:
       demandMultiplier = 1.2
     Else if loadFactor > 0.5:
       demandMultiplier = 1.1
     Else:
       demandMultiplier = 1.0     // Low demand
  
  4. Apply seasonal factor:
     If isPeakSeason(travelDate):
       seasonalMultiplier = 1.3
     Else if isOffPeakSeason(travelDate):
       seasonalMultiplier = 0.9
     Else:
       seasonalMultiplier = 1.0
  
  5. Calculate final price:
     adjustedFare = baseFare × multiplier × demandMultiplier × seasonalMultiplier
     
     taxes = adjustedFare × 0.15 (15% taxes)
     fees = 50 (flat airport fees)
     
     totalPrice = adjustedFare + taxes + fees
  
  6. Return price breakdown

Update frequency: Every 15 minutes or on booking event
```

### 4. Seat Assignment Optimization

```
Problem: Assign seats to maximize passenger satisfaction

autoAssignSeats(passengers, seatMap, preferences):
  
  1. Group passengers:
     - Families/groups: Assign adjacent seats
     - Solo travelers: Distribute across cabin
  
  2. Apply preferences:
     For each passenger:
       preferredTypes = passenger.preferences
       // e.g., window, aisle, front, extra legroom
  
  3. Scoring algorithm:
     For each available seat:
       score = 0
       
       If seat matches preference:
         score += 50
       
       If group and seats adjacent:
         score += 100
       
       If front of cabin:
         score += 20
       
       If extra legroom:
         score += 30
       
       If aisle or window:
         score += 10
  
  4. Assign seats:
     Sort seats by score (descending)
     Assign highest-scored seats to passengers
  
  5. Handle constraints:
     - Infants: Must be with adult in certain rows
     - Exit rows: Age restrictions (15+, able-bodied)
     - Wheelchair: Designated accessible seats
  
  6. Return seat assignments

Fallback: Allow manual selection if auto-assign fails
```

### 5. Price Hold & Expiry

```
Seat Hold Mechanism:

holdSeats(bookingId, flightId, seats, duration = 15 minutes):
  
  1. Mark seats as "held":
     For each seat in seats:
       seat.status = HELD
       seat.heldBy = bookingId
       seat.holdExpiry = now + duration
  
  2. Set expiry timer:
     scheduleJob(releaseSeats, holdExpiry, bookingId)
  
  3. Return hold confirmation

releaseSeats(bookingId):
  
  1. Find held seats:
     heldSeats = seats WHERE heldBy = bookingId
  
  2. Release seats:
     For each seat in heldSeats:
       seat.status = AVAILABLE
       seat.heldBy = null
       seat.holdExpiry = null
  
  3. Notify client:
     Send WebSocket message: SEATS_RELEASED
  
  4. Update availability count

Frontend countdown timer:
  - Display: "Time left: 14:59"
  - Warning at 5 minutes
  - Redirect to search if expired
```

---

## State Management Strategy

### State Architecture

```
Global State (Zustand/Redux):

├── search
│   ├── criteria: SearchCriteria
│   ├── results: Flight[]
│   ├── filters: SearchFilters
│   ├── sortBy: SortOption
│   ├── loading: boolean
│   └── error: string | null
│
├── booking
│   ├── selectedFlight: Flight | null
│   ├── returnFlight: Flight | null
│   ├── passengers: Passenger[]
│   ├── seats: SeatAssignment[]
│   ├── addOns: AddOn[]
│   ├── pricing: BookingPricing
│   ├── currentStep: number
│   ├── holdExpiry: Date | null
│   └── validationErrors: Record<string, string>
│
├── payment
│   ├── method: PaymentMethod
│   ├── status: PaymentStatus
│   ├── transactionId: string | null
│   └── error: string | null
│
├── user
│   ├── profile: User | null
│   ├── isAuthenticated: boolean
│   ├── savedPassengers: Passenger[]
│   ├── bookings: Booking[]
│   └── preferences: UserPreferences
│
└── ui
    ├── seatMapView: 'INTERACTIVE' | 'LIST'
    ├── priceAlerts: PriceAlert[]
    ├── notifications: Notification[]
    └── modals: ModalState
```

### State Flow Patterns

```
Pattern 1: Search Flow

1. User enters search criteria
   ├─ Update search state
   └─ Validate inputs

2. Submit search
   ├─ Show loading spinner
   ├─ Call search API
   └─ Handle response:
       ├─ Success: Update results
       └─ Error: Show error message

3. Apply filters
   ├─ Update filter state
   ├─ Filter results client-side
   └─ Re-render filtered list

4. Select flight
   ├─ Save to booking state
   ├─ Start hold timer
   └─ Navigate to booking flow

Pattern 2: Booking Flow

1. Review Flight (Step 1)
   ├─ Display flight details
   └─ Confirm selection

2. Enter Passengers (Step 2)
   ├─ Add passenger forms
   ├─ Validate each passenger
   ├─ Check saved profiles
   └─ Enable next step when valid

3. Select Seats (Step 3)
   ├─ Fetch seat map
   ├─ Check availability
   ├─ Allow selection
   ├─ Calculate seat charges
   └─ Update pricing

4. Add-Ons (Step 4)
   ├─ Display optional add-ons
   ├─ Calculate costs
   └─ Update pricing

5. Review & Pay (Step 5)
   ├─ Display full summary
   ├─ Collect payment info
   ├─ Process payment
   └─ On success:
       ├─ Create booking
       ├─ Release seat hold
       └─ Navigate to confirmation

Pattern 3: Real-time Updates

WebSocket events:
├─ SEAT_AVAILABILITY_CHANGED
│   └─ Update seat map
├─ PRICE_CHANGED
│   └─ Show notification, re-fetch
├─ FLIGHT_DELAYED
│   └─ Update flight status
└─ HOLD_EXPIRING
    └─ Show countdown warning
```

---

## API Contract

### REST Endpoints

```
Search & Flights
GET /api/flights/search?origin=JFK&destination=LAX&date=2026-02-15&passengers=2&class=ECONOMY
POST /api/flights/search (complex search with multi-city)
GET /api/flights/:flightId
GET /api/flights/:flightId/seat-map
GET /api/flights/fare-calendar?origin=JFK&destination=LAX&month=2026-02

Booking
POST /api/bookings/hold
  - Hold seats temporarily
POST /api/bookings/create
  - Create confirmed booking
GET /api/bookings/:bookingId
PUT /api/bookings/:bookingId
  - Modify booking
POST /api/bookings/:bookingId/cancel
GET /api/bookings?userId=&status=

Check-in
POST /api/checkin/lookup
  - Find booking by PNR + last name
POST /api/checkin/:bookingId/complete
  - Complete check-in
GET /api/checkin/:bookingId/boarding-pass

Payment
POST /api/payments/initiate
POST /api/payments/confirm
POST /api/payments/refund
GET /api/payments/:paymentId/status

User
GET /api/users/me
PUT /api/users/me
GET /api/users/me/bookings
GET /api/users/me/saved-passengers
POST /api/users/me/saved-passengers

Notifications
POST /api/notifications/price-alerts
GET /api/notifications/flight-status/:flightId
```

### API Examples

#### 1. Search Flights

```
POST /api/flights/search

Request:
{
  "tripType": "ROUND_TRIP",
  "origin": "JFK",
  "destination": "LAX",
  "departureDate": "2026-02-15",
  "returnDate": "2026-02-22",
  "passengers": {
    "adults": 2,
    "children": 1,
    "infants": 0
  },
  "cabinClass": "ECONOMY",
  "directFlightsOnly": false
}

Response:
{
  "outbound": [
    {
      "id": "flight_001",
      "flightNumber": "AA123",
      "airline": {
        "code": "AA",
        "name": "American Airlines",
        "logo": "https://..."
      },
      "origin": {
        "code": "JFK",
        "name": "John F. Kennedy International",
        "city": "New York"
      },
      "destination": {
        "code": "LAX",
        "name": "Los Angeles International",
        "city": "Los Angeles"
      },
      "departureTime": "2026-02-15T10:00:00Z",
      "arrivalTime": "2026-02-15T13:30:00Z",
      "duration": 330,
      "stops": 0,
      "segments": [
        {
          "segmentNumber": 1,
          "flightNumber": "AA123",
          "origin": "JFK",
          "destination": "LAX",
          "departureTime": "2026-02-15T10:00:00Z",
          "arrivalTime": "2026-02-15T13:30:00Z",
          "aircraft": "Boeing 737-800"
        }
      ],
      "fareClasses": [
        {
          "class": "ECONOMY",
          "fareType": "STANDARD",
          "price": {
            "amount": 459.00,
            "currency": "USD",
            "baseFare": 380.00,
            "taxes": 65.00,
            "fees": 14.00,
            "total": 459.00
          },
          "availableSeats": 12
        }
      ],
      "baggageAllowance": {
        "checkedBags": 1,
        "carryOnBags": 1,
        "maxWeightPerBag": 23
      }
    }
  ],
  "return": [...],
  "totalResults": 47,
  "searchId": "search_xyz123"
}
```

#### 2. Create Booking

```
POST /api/bookings/create

Request:
{
  "searchId": "search_xyz123",
  "outboundFlightId": "flight_001",
  "returnFlightId": "flight_045",
  "passengers": [
    {
      "type": "ADULT",
      "title": "Mr",
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-05-15",
      "gender": "MALE",
      "nationality": "US",
      "passportNumber": "123456789",
      "passportExpiry": "2028-12-31",
      "frequentFlyerNumber": "AA1234567"
    }
  ],
  "contactInfo": {
    "email": "john@example.com",
    "phone": "+1234567890",
    "countryCode": "US"
  },
  "seats": [
    {
      "passengerId": "passenger_temp_1",
      "flightId": "flight_001",
      "seatNumber": "12A"
    }
  ],
  "addOns": [
    {
      "type": "CHECKED_BAGGAGE",
      "quantity": 1,
      "passengerId": "passenger_temp_1"
    }
  ],
  "payment": {
    "method": "CREDIT_CARD",
    "token": "tok_visa_1234"  // From payment gateway
  }
}

Response:
{
  "bookingId": "booking_abc123",
  "pnr": "ABC123",
  "status": "CONFIRMED",
  "flights": [...],
  "passengers": [...],
  "pricing": {
    "baseFare": 918.00,
    "taxes": 138.00,
    "fees": 28.00,
    "seatCharges": 30.00,
    "baggageCharges": 35.00,
    "total": 1149.00,
    "currency": "USD"
  },
  "payment": {
    "paymentId": "pay_xyz789",
    "status": "COMPLETED",
    "transactionId": "txn_123456"
  },
  "eTickets": [
    {
      "passengerId": "passenger_1",
      "ticketNumber": "0012345678901",
      "downloadUrl": "https://..."
    }
  ],
  "createdAt": "2026-01-28T20:00:00Z"
}
```

#### 3. Get Seat Map

```
GET /api/flights/flight_001/seat-map?class=ECONOMY

Response:
{
  "flightId": "flight_001",
  "aircraft": "Boeing 737-800",
  "cabinClass": "ECONOMY",
  "configuration": {
    "rows": 30,
    "columns": ["A", "B", "C", "D", "E", "F"],
    "aisles": [3],
    "exitRows": [12, 13]
  },
  "seats": [
    {
      "seatNumber": "1A",
      "row": 1,
      "column": "A",
      "type": "WINDOW",
      "available": false,
      "price": 0
    },
    {
      "seatNumber": "12A",
      "row": 12,
      "column": "A",
      "type": "EXIT_ROW",
      "available": true,
      "price": 30,
      "restrictions": ["Must be 15+", "Able-bodied"]
    }
  ],
  "legend": {
    "available": 156,
    "occupied": 44,
    "exitRow": 12,
    "extraLegroom": 18
  }
}
```

### WebSocket Events

```typescript
// Client → Server
{
  type: 'SUBSCRIBE_FLIGHT',
  flightId: 'flight_001'
}

{
  type: 'SUBSCRIBE_SEARCH',
  searchId: 'search_xyz123'
}

// Server → Client
{
  type: 'SEAT_AVAILABILITY_CHANGED',
  flightId: 'flight_001',
  cabinClass: 'ECONOMY',
  availableSeats: 11,  // Was 12
  timestamp: 1642001234567
}

{
  type: 'PRICE_CHANGED',
  flightId: 'flight_001',
  oldPrice: 459.00,
  newPrice: 479.00,
  reason: 'HIGH_DEMAND',
  timestamp: 1642001234567
}

{
  type: 'HOLD_EXPIRING',
  bookingId: 'booking_temp_123',
  expiresIn: 300000,  // 5 minutes in ms
  timestamp: 1642001234567
}

{
  type: 'FLIGHT_STATUS_CHANGED',
  flightId: 'flight_001',
  oldStatus: 'SCHEDULED',
  newStatus: 'DELAYED',
  delay: 30,  // minutes
  reason: 'Weather',
  timestamp: 1642001234567
}
```

---

## Real-Time Features

### Seat Availability Updates

```
Implementation:

1. Server-side:
   ├─ On booking confirmed:
   │   ├─ Update seat status
   │   ├─ Decrease available seats count
   │   └─ Broadcast to subscribers
   │
   └─ On hold expired:
       ├─ Release seats
       ├─ Increase available seats count
       └─ Broadcast update

2. Client-side:
   ├─ Subscribe to flight on seat map view
   ├─ Listen for SEAT_AVAILABILITY_CHANGED
   ├─ Update seat status in real-time
   └─ Show notification if selected seat taken

3. Conflict resolution:
   If user's selected seat becomes unavailable:
   ├─ Show modal: "Seat no longer available"
   ├─ Highlight alternative seats
   └─ Allow re-selection
```

### Dynamic Pricing Updates

```
Price Update Strategy:

1. Trigger conditions:
   ├─ Every 15 minutes (scheduled)
   ├─ On booking event (demand increase)
   ├─ Load factor threshold crossed (>70%, >90%)
   └─ Competitive pricing change

2. Update flow:
   ├─ Recalculate prices
   ├─ Store in cache (15-min TTL)
   ├─ Broadcast to active searchers
   └─ Log price history

3. Frontend handling:
   ├─ Listen for PRICE_CHANGED event
   ├─ Check if affects user's selection
   ├─ If yes:
   │   ├─ Show modal: "Price changed"
   │   ├─ Display old vs new price
   │   └─ Give option to continue or re-search
   └─ Update search results display
```

### Hold Timer Synchronization

```
Hold Timer Implementation:

Server-side:
├─ Store hold expiry in database
├─ Set Redis expiry key (auto-expire)
├─ Schedule background job
└─ Send WebSocket updates at intervals

Client-side:
├─ Receive initial expiry time
├─ Start countdown timer
├─ Sync with server every 60 seconds
├─ Show warnings:
│   ├─ 5 minutes: Yellow banner
│   ├─ 2 minutes: Orange banner + sound
│   └─ 30 seconds: Red banner + urgent alert
└─ On expiry:
    ├─ Clear booking state
    ├─ Show modal: "Session expired"
    └─ Redirect to search

Countdown Display:
"Complete booking in: 14:23"
"⚠️ Hurry! Only 4:59 left"
"🚨 URGENT: 0:45 remaining"
```

---

## Payment Flow

### Payment Integration

```
Payment Flow:

1. User clicks "Pay Now"
   │
   ▼
2. Frontend validation
   ├─ Check all required fields
   ├─ Validate card details (client-side)
   └─ Calculate final amount
   │
   ▼
3. Create payment intent
   POST /api/payments/initiate
   ├─ Create temporary payment record
   ├─ Generate unique payment ID
   └─ Return client secret
   │
   ▼
4. Process payment (via Stripe/PayPal)
   ├─ Send card details to payment gateway
   ├─ 3D Secure authentication (if required)
   ├─ Wait for authorization
   └─ Receive payment token
   │
   ▼
5. Confirm payment
   POST /api/payments/confirm
   ├─ Validate payment token
   ├─ Charge card
   ├─ Update payment status
   └─ If successful:
       ├─ Create booking
       ├─ Confirm seats
       ├─ Send confirmation email
       └─ Generate e-tickets
   │
   ▼
6. Handle result
   ├─ Success:
   │   ├─ Navigate to confirmation
   │   └─ Clear booking state
   └─ Failure:
       ├─ Show error message
       ├─ Keep form data
       ├─ Allow retry
       └─ Don't release seat hold
```

### Payment Methods

```
Supported Payment Methods:

1. Credit/Debit Card:
   ├─ Visa, Mastercard, Amex
   ├─ 3D Secure for security
   ├─ Save card for future (optional)
   └─ PCI-DSS compliant

2. Digital Wallets:
   ├─ PayPal
   ├─ Apple Pay
   ├─ Google Pay
   └─ One-click checkout

3. Bank Transfer:
   ├─ Generate payment reference
   ├─ Manual confirmation required
   └─ 2-4 hour processing

4. Buy Now, Pay Later:
   ├─ Affirm, Klarna
   ├─ Installment plans
   └─ Credit check required
```

### Refund Processing

```
Refund Flow:

1. User requests cancellation
   │
   ▼
2. Calculate refund amount
   cancelBooking(bookingId):
     ├─ Get booking details
     ├─ Check fare rules
     ├─ Calculate:
     │   ├─ Time to departure
     │   ├─ Cancellation fee
     │   ├─ Non-refundable components
     │   └─ Refundable amount
     └─ Return refund breakdown
   
3. Refund calculation rules:
   If fareType = BASIC:
     refund = 0 (non-refundable)
   
   Else if fareType = STANDARD:
     If daysToDepart > 7:
       cancellationFee = $50
     Else if daysToDepart > 1:
       cancellationFee = $100
     Else:
       cancellationFee = 50% of fare
     
     refund = totalPaid - cancellationFee
   
   Else if fareType = FLEXIBLE:
     If daysToDepart > 1:
       cancellationFee = $25
     Else:
       cancellationFee = $50
     
     refund = totalPaid - cancellationFee
   
   Else if fareType = FULLY_REFUNDABLE:
     refund = totalPaid

4. Process refund
   ├─ Cancel booking
   ├─ Release seats
   ├─ Initiate refund to original payment method
   ├─ Send confirmation email
   └─ Update booking status

5. Refund timeline:
   ├─ Credit/Debit card: 5-10 business days
   ├─ PayPal: 1-3 business days
   └─ Bank transfer: 7-14 business days
```

---

## UI/UX Flow

### User Journeys

#### Journey 1: Searching and Booking a Flight

```
1. User lands on homepage
   │
   ▼
2. Enters search criteria
   ├─ From: New York (JFK)
   ├─ To: Los Angeles (LAX)
   ├─ Departure: Feb 15
   ├─ Return: Feb 22
   ├─ Passengers: 2 adults
   └─ Class: Economy
   │
   ▼
3. Clicks "Search Flights"
   ├─ Show loading animation
   └─ Display progress: "Searching 100+ airlines..."
   │
   ▼
4. View search results (47 flights)
   ├─ Default sort: Best value
   ├─ See filters on left
   ├─ See flight cards
   └─ Scrolls through options
   │
   ▼
5. Applies filters
   ├─ Price: $300-$500
   ├─ Non-stop only
   └─ Departure: Morning (6-12)
   │
   ▼
6. Results narrow to 8 flights
   ├─ Clicks "View Details" on flight
   └─ Modal shows:
       ├─ Full itinerary
       ├─ Baggage policy
       ├─ Fare rules
       └─ Amenities
   │
   ▼
7. Selects flight at $459
   ├─ Confirm selection
   ├─ Timer starts: "Complete in 15:00"
   └─ Navigate to booking
   │
   ▼
8. Reviews flight (Step 1)
   ├─ Outbound: AA123
   ├─ Return: AA456
   └─ Clicks "Continue"
   │
   ▼
9. Enters passenger details (Step 2)
   ├─ Passenger 1: John Doe
   │   ├─ Name, DOB, Gender
   │   └─ Passport info
   ├─ Passenger 2: Jane Doe
   ├─ Contact: john@example.com
   └─ Clicks "Continue"
   │
   ▼
10. Selects seats (Step 3)
    ├─ Interactive seat map appears
    ├─ Selects 12A (window) for John
    ├─ Selects 12B (aisle) for Jane
    ├─ Seat charges: +$30
    └─ Clicks "Continue"
    │
    ▼
11. Add-ons (Step 4)
    ├─ Checked bag: +$35 each = $70
    ├─ Travel insurance: $45
    └─ Total updated: $604
    │
    ▼
12. Review & Pay (Step 5)
    ├─ Reviews full summary
    ├─ Enters card details
    ├─ Accepts terms
    └─ Clicks "Pay $604"
    │
    ▼
13. Payment processing
    ├─ Show spinner: "Processing payment..."
    ├─ 3D Secure popup (if required)
    └─ Wait for confirmation
    │
    ▼
14. Success!
    ├─ Booking confirmed
    ├─ PNR: ABC123
    ├─ E-tickets sent to email
    ├─ Download boarding pass
    └─ Add to calendar option
```

#### Journey 2: Modifying a Booking

```
1. User logs in
   │
   ▼
2. Navigates to "My Bookings"
   │
   ▼
3. Views upcoming trip
   ├─ PNR: ABC123
   ├─ JFK → LAX, Feb 15
   └─ Status: Confirmed
   │
   ▼
4. Clicks "Modify Booking"
   │
   ▼
5. Shows modification options
   ├─ Change dates
   ├─ Change passengers
   ├─ Add/remove baggage
   ├─ Change seats
   └─ Cancel booking
   │
   ▼
6. User selects "Change dates"
   │
   ▼
7. Shows new search
   ├─ Same route
   ├─ New date picker
   └─ Search available flights
   │
   ▼
8. Shows available options
   ├─ Original: Feb 15, $459
   ├─ New: Feb 16, $489
   └─ Change fee: $75
   │
   ▼
9. User confirms
   ├─ Total: $489 + $75 - $459 = $105 to pay
   ├─ Or: Credit of $354 if cheaper
   └─ Process payment difference
   │
   ▼
10. Booking updated
    ├─ New confirmation sent
    ├─ Original booking cancelled
    └─ New e-tickets issued
```

#### Journey 3: Online Check-in

```
1. User receives reminder (24hrs before)
   ├─ Email: "Check-in now available"
   └─ Push notification
   │
   ▼
2. User clicks "Check-in"
   │
   ▼
3. Booking lookup
   ├─ Enter PNR: ABC123
   ├─ Enter Last name: Doe
   └─ Submit
   │
   ▼
4. Booking found
   ├─ Shows flight details
   ├─ Lists passengers
   └─ Option to check-in all or select
   │
   ▼
5. Select passengers to check-in
   ├─ ✓ John Doe
   └─ ✓ Jane Doe
   │
   ▼
6. Verify/select seats
   ├─ Current seats shown
   ├─ Option to change (free)
   └─ Confirm seats
   │
   ▼
7. Baggage declaration
   ├─ How many bags to check?
   ├─ Weight limits shown
   └─ Confirm
   │
   ▼
8. Travel documents verification
   ├─ Passport number confirmed
   ├─ Visa requirements checked
   └─ Health declaration (if required)
   │
   ▼
9. Check-in complete
   ├─ Boarding passes generated
   ├─ Download PDF
   ├─ Add to Apple Wallet
   ├─ Email sent
   └─ SMS with gate info
```

### Responsive Design

```
Desktop (>1200px):
┌─────────────────────────────────────────────┐
│ Header + Navigation                         │
├─────────────────────────────────────────────┤
│ [Search Widget - Full width]                │
├──────────────┬──────────────────────────────┤
│ Filters      │  Flight Results              │
│ (Sidebar)    │  ┌──────────────────────┐   │
│ - Price      │  │ Flight Card 1        │   │
│ - Airlines   │  └──────────────────────┘   │
│ - Stops      │  ┌──────────────────────┐   │
│ - Times      │  │ Flight Card 2        │   │
│              │  └──────────────────────┘   │
└──────────────┴──────────────────────────────┘

Mobile (<768px):
┌─────────────────┐
│ Header          │
├─────────────────┤
│ Search Widget   │
│ (Collapsible)   │
├─────────────────┤
│ [Filter Button] │
├─────────────────┤
│ Flight Card 1   │
│ (Compact)       │
├─────────────────┤
│ Flight Card 2   │
└─────────────────┘

Seat Map (Mobile):
├─ Zoom in/out
├─ Swipe to pan
├─ Tap to select
└─ Bottom sheet with details
```

### Visual Feedback

```
Status Indicators:

Flight Status:
├─ 🟢 On Time
├─ 🟡 Delayed
├─ 🔴 Cancelled
└─ 🔵 Departed

Booking Status:
├─ ⏳ Pending Payment
├─ ✅ Confirmed
├─ 🎫 Checked-in
├─ ✈️ Boarded
└─ ❌ Cancelled

Seat Status:
├─ ⬜ Available
├─ 🟦 Selected
├─ ⬛ Occupied
└─ 💵 Premium (extra cost)

Price Trend:
├─ 📉 Price dropped
├─ 📈 Price increased
└─ ➡️ No change
```

---

## Performance Optimization

### 1. Search Optimization

```
Problem: Slow search with 100k+ flights

Solutions:

1. Database Indexing:
   ├─ Index on (origin, destination, date)
   ├─ Index on (airline, flightNumber)
   └─ Composite index for common filters

2. Caching Strategy:
   ├─ Cache popular routes (30-min TTL)
   ├─ Cache search results (15-min TTL)
   └─ Cache airline data (24-hour TTL)

3. Query Optimization:
   ├─ Limit results to 100
   ├─ Pagination (load 20 at a time)
   ├─ Lazy load flight details
   └─ Fetch prices in parallel

4. Client-side Filtering:
   ├─ Filter/sort without API call
   ├─ Use Web Workers for heavy computations
   └─ Debounce filter changes

Result: Search time < 2s
```

### 2. Seat Map Rendering

```
Problem: Rendering 300+ seats is slow

Solutions:

1. Virtualization:
   ├─ Render only visible rows
   ├─ Add 5-row buffer above/below
   └─ Unrender off-screen seats

2. SVG Optimization:
   ├─ Use sprites for seat icons
   ├─ Minimize DOM nodes
   └─ CSS transforms for selection

3. Lazy Loading:
   ├─ Load seat map only when tab active
   ├─ Show skeleton during load
   └─ Cache seat map (5-min TTL)

4. Debouncing:
   ├─ Debounce seat hover (100ms)
   └─ Throttle scroll events

Result: 60fps scrolling with 300+ seats
```

### 3. Payment Form Optimization

```
Optimizations:

1. Lazy Load Payment Gateway:
   ├─ Load Stripe.js only on payment step
   ├─ Use dynamic import
   └─ Show progress during load

2. Form Validation:
   ├─ Client-side validation (instant)
   ├─ Debounce API validation (card BIN)
   └─ Show inline errors

3. Autofill Support:
   ├─ Use proper autocomplete attributes
   ├─ Support browser autofill
   └─ Support payment request API

4. Progressive Enhancement:
   ├─ Basic form works without JS
   ├─ Enhanced UX with JS
   └─ Fallback for payment gateway errors
```

### 4. Image Optimization

```
Airline Logos:
├─ Use WebP with fallback
├─ Serve appropriate size (40px, 80px)
├─ Lazy load below fold
└─ CDN with image optimization

E-tickets/Boarding Passes:
├─ Generate on-demand
├─ Cache in browser (IndexedDB)
├─ Progressive JPEG for preview
└─ Print-optimized version

Icons:
├─ Use icon sprite sheet
├─ Inline critical icons (SVG)
└─ Font icons for flexibility
```

### 5. Bundle Optimization

```
Target: < 500KB initial bundle

Strategies:

1. Code Splitting:
   ├─ Search page: 150KB
   ├─ Booking flow: 200KB (lazy)
   ├─ Account pages: 100KB (lazy)
   └─ Admin tools: Separate app

2. Dynamic Imports:
   ├─ Payment gateway
   ├─ Date picker library
   ├─ Seat map component
   └─ PDF generator

3. Tree Shaking:
   ├─ Import only used functions
   ├─ Remove dead code
   └─ Use ES modules

4. Dependency Optimization:
   ├─ Replace moment.js with date-fns
   ├─ Use lite version of lodash
   └─ Remove unused CSS frameworks
```

---

## Trade-offs & Design Decisions

### 1. Search Results: All at Once vs Pagination

| Approach | UX | Performance | Decision |
|----------|-----|-------------|----------|
| **Load All** | Best (no clicks) | Poor (slow initial load) | ❌ |
| **Pagination** | Good (page numbers) | Good | ✅ For desktop |
| **Infinite Scroll** | Excellent (seamless) | Excellent | ✅ **Recommended (mobile)** |
| **Virtual Scroll** | Excellent | Excellent | 🔄 Future optimization |

**Decision**: ✅ **Hybrid**
- Desktop: Traditional pagination (20 per page)
- Mobile: Infinite scroll
- Virtualization for 100+ results

---

### 2. Seat Hold Duration

| Duration | User Pressure | Inventory Efficiency | Decision |
|----------|---------------|----------------------|----------|
| **5 minutes** | High | Excellent | Too rushed |
| **15 minutes** | Medium | Good | ✅ **Recommended** |
| **30 minutes** | Low | Poor | Seats blocked too long |
| **No hold** | None | Poor | Race conditions |

**Decision**: ✅ **15 minutes**
- Enough time to complete booking
- Prevents inventory blocking
- Industry standard
- Clear countdown warnings

---

### 3. Price Display: Inclusive vs Base + Taxes

| Display | Transparency | Initial Appeal | Decision |
|---------|--------------|----------------|----------|
| **All-inclusive** | High | Lower (higher price) | ✅ Honest |
| **Base + taxes later** | Low | Higher (misleading) | ❌ Frustrating |
| **Prominent + Breakdown** | Highest | Balanced | ✅ **Recommended** |

**Decision**: ✅ **Inclusive with breakdown**
- Show total price prominently: **$459**
- Show breakdown on hover/expand
- Comply with regulations (DOT, EU)
- Build trust with transparency

---

### 4. Payment Processing: Direct vs Tokenized

| Approach | Security | PCI Compliance | Decision |
|----------|----------|----------------|----------|
| **Direct** | Risk | Complex | ❌ Not recommended |
| **Tokenized** | Secure | Simplified | ✅ **Recommended** |
| **3rd Party Only** | Most Secure | Easiest | Limited customization |

**Decision**: ✅ **Tokenized with Stripe/Braintree**
- PCI-DSS compliant (SAQ-A)
- Secure token exchange
- Customizable UI
- 3D Secure support

---

### 5. Seat Selection: Required vs Optional

| Approach | Revenue | UX | Decision |
|----------|---------|-----|----------|
| **Always Required** | Higher | Poor (friction) | ❌ |
| **Always Optional** | Lower | Good | Some passengers want specific seats |
| **Smart Default** | Balanced | Excellent | ✅ **Recommended** |

**Decision**: ✅ **Optional with smart recommendations**
- Allow skip (auto-assign at check-in)
- Show "Recommended for you" based on preferences
- Upsell premium seats subtly
- Required for groups (keep together)

---

### 6. Booking Modification: Free vs Paid

| Policy | Revenue | Customer Satisfaction | Decision |
|--------|---------|----------------------|----------|
| **Always Free** | Lower | Very High | Not sustainable |
| **Always Paid** | Higher | Low | Customer dissatisfaction |
| **Tiered Fares** | Balanced | High | ✅ **Recommended** |
| **Time-based** | Balanced | Medium | Alternative |

**Decision**: ✅ **Tiered fare types**
- Basic: No changes (lowest price)
- Standard: Changes with fee
- Flexible: Free changes
- Fully Refundable: Free changes + refund
- Let customer choose trade-off

---

### 7. Search Filters: Client-side vs Server-side

| Approach | Speed | Accuracy | Decision |
|----------|-------|----------|----------|
| **Client-side** | Instant | May be stale | ✅ For basic filters |
| **Server-side** | Slower | Always fresh | ✅ For price/availability |
| **Hybrid** | Balanced | Good | ✅ **Recommended** |

**Decision**: ✅ **Hybrid approach**
- Client-side: Price range, airlines, stops (instant)
- Server-side: Date changes, cabin class (fresh data)
- Debounce server calls (500ms)
- Cache server responses (5 minutes)

---

### 8. Multi-Currency: Live Rates vs Daily

| Approach | Accuracy | Cost | Complexity | Decision |
|----------|----------|------|------------|----------|
| **Live Rates** | Highest | High (API cost) | Medium | For payment |
| **Daily Cached** | High | Low | Low | ✅ **For display** |
| **Static Rates** | Low | Free | Low | ❌ Inaccurate |

**Decision**: ✅ **Daily cached for display, live for payment**
- Display prices: Daily cached rates (updated 6 AM)
- Payment: Live rates at transaction time
- Show last updated timestamp
- Allow manual currency selection

---

### 9. Booking Confirmation: Instant vs Email

| Method | Speed | Reliability | Decision |
|--------|-------|-------------|----------|
| **Instant on-screen** | Immediate | Can be lost | ✅ Primary |
| **Email** | Delayed (seconds) | Permanent record | ✅ Backup |
| **SMS** | Fast | Extra cost | Optional |

**Decision**: ✅ **Multi-channel**
- Instant: Show on-screen immediately
- Email: Send within 30 seconds (primary record)
- SMS: Optional, for mobile users
- PDF: Download link available
- Account: Always accessible in "My Bookings"

---

## Scalability Considerations

### Horizontal Scaling

```
Architecture for Scale:

Load Balancer (L7)
├─ Web Server Cluster
│   ├─ App Server 1-10 (Stateless)
│   └─ Sticky sessions for booking flow
│
├─ API Server Cluster
│   ├─ API Server 1-20
│   └─ Rate limiting per user
│
├─ Search Service Cluster
│   ├─ Search Node 1-5 (Read replicas)
│   └─ Elasticsearch cluster
│
└─ WebSocket Server Cluster
    ├─ WS Server 1-5
    └─ Redis Pub/Sub for cross-server events

Caching Layer:
├─ Redis Cluster (Cache)
│   ├─ Flight search results
│   ├─ Seat maps
│   └─ User sessions
│
└─ CDN (CloudFront)
    ├─ Static assets
    ├─ Airline logos
    └─ E-tickets

Database Layer:
├─ PostgreSQL Primary (Write)
├─ PostgreSQL Replicas (×3 Read)
└─ MongoDB (Logs, Analytics)

Message Queue:
├─ RabbitMQ / SQS
├─ Email notifications
├─ Price update jobs
└─ Booking confirmations

Capacity:
├─ 100,000 concurrent users
├─ 10,000 bookings/hour
├─ 1M searches/day
└─ 99.99% uptime
```

### Database Optimization

```
Partitioning Strategy:

Flights Table:
├─ Partition by departure_date (monthly)
├─ Archive old flights (>1 year)
└─ Read from partitions based on search date

Bookings Table:
├─ Partition by created_at (yearly)
├─ Hot partition: Current year
└─ Warm storage: Previous years

Seats Table:
├─ Partition by flight_id
├─ High write throughput
└─ Eventual consistency acceptable

Indexing:
├─ B-tree: origin, destination, date
├─ Hash: flight_id, booking_id, pnr
└─ Full-text: airport names, cities
```

---

## Security Considerations

### Data Protection

```
PII (Personally Identifiable Information):

1. Encryption at Rest:
   ├─ Passenger details (AES-256)
   ├─ Payment info (tokenized, not stored)
   ├─ Passport numbers (encrypted)
   └─ Contact info (encrypted)

2. Encryption in Transit:
   ├─ TLS 1.3 for all API calls
   ├─ WSS for WebSocket
   └─ HSTS headers

3. Data Minimization:
   ├─ Store only required data
   ├─ Delete after retention period
   └─ Anonymize analytics data

4. Access Control:
   ├─ Role-based access (RBAC)
   ├─ Principle of least privilege
   └─ Audit logging
```

### Payment Security

```
PCI-DSS Compliance:

1. Never store:
   ├─ Full card numbers (use tokens)
   ├─ CVV codes
   └─ Magnetic stripe data

2. Tokenization:
   ├─ Use Stripe/Braintree tokens
   ├─ Exchange tokens server-side
   └─ Store only last 4 digits

3. 3D Secure:
   ├─ Required for European cards (SCA)
   ├─ Recommended for all regions
   └─ Reduce fraud/chargebacks

4. Fraud Detection:
   ├─ Address verification (AVS)
   ├─ IP geolocation checks
   ├─ Velocity checks
   └─ ML-based fraud scoring
```

### API Security

```
Protection Layers:

1. Authentication:
   ├─ JWT tokens (15-min expiry)
   ├─ Refresh tokens (7 days)
   ├─ OAuth 2.0 for social login
   └─ 2FA optional

2. Rate Limiting:
   ├─ 100 requests/min per user
   ├─ 10 bookings/hour per user
   ├─ 1000 searches/day per IP
   └─ Exponential backoff

3. Input Validation:
   ├─ Sanitize all inputs
   ├─ Validate airport codes
   ├─ Validate dates (future only)
   └─ Prevent SQL injection

4. CSRF Protection:
   ├─ CSRF tokens for mutations
   ├─ SameSite cookies
   └─ Origin validation

5. DDoS Protection:
   ├─ CloudFlare/AWS Shield
   ├─ IP blocking
   └─ Challenge pages
```

---

## Testing Strategy

```
Unit Tests:
├─ Price calculation logic
├─ Seat assignment algorithm
├─ Date/time calculations
├─ Fare rules validation
└─ Discount application

Integration Tests:
├─ Search → Results → Selection
├─ Booking flow (all steps)
├─ Payment processing
├─ Email notifications
└─ WebSocket events

E2E Tests:
├─ Complete booking journey
├─ Modification flows
├─ Cancellation flows
├─ Check-in process
└─ Multi-passenger bookings

Performance Tests:
├─ Search under load (10k concurrent)
├─ Booking under load (1k concurrent)
├─ Payment processing
├─ Database query performance
└─ API response times

Security Tests:
├─ Penetration testing
├─ SQL injection attempts
├─ XSS vulnerability scans
├─ CSRF protection
└─ Payment security audit
```

---

## Future Enhancements

### Phase 2
1. **Loyalty Program**: Points, rewards, status tiers
2. **Trip Planning**: Hotels, car rentals, packages
3. **Group Bookings**: Manage 10+ passengers
4. **Seat Upgrades**: Bid for business class
5. **Price Prediction**: ML-based price forecasts

### Phase 3
1. **Virtual Interlining**: Connect airlines not in alliance
2. **Carbon Offsetting**: Calculate and offset emissions
3. **Travel Assistant**: AI-powered trip recommendations
4. **VR Seat Preview**: Virtual tour of cabin
5. **Blockchain Ticketing**: NFT-based e-tickets

---

## Technology Stack

```
Frontend:
├─ React 18+ with TypeScript
├─ Next.js (SSR for SEO)
├─ Zustand (State management)
├─ React Query (Server state)
├─ Tailwind CSS
├─ Framer Motion (Animations)
└─ Socket.io-client

Backend:
├─ Node.js + Express
├─ PostgreSQL (Primary database)
├─ Redis (Cache + Pub/Sub)
├─ Elasticsearch (Flight search)
├─ RabbitMQ (Job queue)
└─ Socket.io (WebSocket)

External Services:
├─ Stripe/Braintree (Payments)
├─ Amadeus GDS (Flight data)
├─ SendGrid (Email)
├─ Twilio (SMS)
└─ Cloudinary (Images)

Infrastructure:
├─ AWS / Google Cloud
├─ CloudFront (CDN)
├─ S3 (File storage)
├─ CloudWatch (Monitoring)
└─ Sentry (Error tracking)

DevOps:
├─ Docker + Kubernetes
├─ GitHub Actions (CI/CD)
├─ Terraform (Infrastructure as Code)
└─ Datadog (Monitoring)
```

---

**Document Version**: 1.0  
**Last Updated**: January 2026  
**Focus**: High-Level Architecture & Design Decisions
