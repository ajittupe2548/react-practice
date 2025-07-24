# GraphQL Countries Explorer

A comprehensive React application demonstrating GraphQL implementation with Apollo Client. This project showcases best practices for GraphQL integration, error handling, caching, and performance optimization.

## Features

### GraphQL Implementation

-   Apollo Client setup with proper configuration
-   Query examples with variables and fragments
-   Lazy Queries for on-demand data fetching
-   Error Handling for both network and GraphQL errors
-   Caching strategies with InMemoryCache
-   Loading States management
-   Real-time Updates with refetch functionality

### UI/UX Features

-   Search & Filter functionality
-   Responsive Design for all device sizes
-   Loading Spinners with different sizes
-   Error Messages with retry functionality
-   Card-based Layout with hover effects
-   Gradient Design with modern aesthetics

### Technical Features

-   Component-based Architecture
-   CSS Modules for styling
-   Performance Optimization with lazy loading
-   Error Boundaries implementation
-   Accessibility considerations
-   TypeScript-ready structure

## GraphQL Concepts Demonstrated

### 1. Apollo Client Setup

```javascript
// apollo/client.js
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: { errorPolicy: "all" },
        query: { fetchPolicy: "cache-first" },
    },
});
```

### 2. Query Implementation

```javascript
// apollo/queries.js
export const GET_COUNTRIES = gql`
    query GetCountries {
        countries {
            code
            name
            emoji
            capital
            continent {
                name
            }
        }
    }
`;
```

### 3. React Hook Usage

```javascript
// components/CountryList.js
const { loading, error, data, refetch } = useQuery(GET_COUNTRIES, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
});
```

### 4. Lazy Query Implementation

```javascript
// components/CountryCard.js
const [getCountryDetails, { loading, error, data }] = useLazyQuery(
    GET_COUNTRY_BY_CODE,
    { variables: { code: country.code } }
);
```

## Installation & Setup

### Prerequisites

-   Node.js (v16.14.2 or higher)
-   npm or yarn

### Installation Steps

1. Clone the repository

    ```bash
    git clone <repository-url>
    cd react-practice
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Start the development server

    ```bash
    npm start
    ```

4. Open your browser
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── apollo/
│   ├── client.js          # Apollo Client configuration
│   └── queries.js         # GraphQL queries and mutations
├── components/
│   ├── CountryList.js     # Main country listing component
│   ├── CountryCard.js     # Individual country card with lazy loading
│   ├── SearchAndFilter.js # Search and filtering functionality
│   ├── LoadingSpinner.js  # Reusable loading component
│   ├── ErrorMessage.js    # Error display component
│   └── *.css             # Component-specific styles
├── App.js                # Main application component
├── App.css               # Global application styles
└── index.js              # Application entry point
```

## 🔧 GraphQL API

This project uses the Countries GraphQL API by Trevor Blades:

-   Endpoint: `https://countries.trevorblades.com/`
-   Documentation: [GitHub Repository](https://github.com/trevorblades/countries)
-   Features: Free, no authentication required, comprehensive country data

### Available Queries

-   `countries` - Get all countries
-   `country(code: ID!)` - Get specific country by code
-   `continent(code: String!)` - Get continent with countries

## Key Learning Points

### 1. Apollo Client Configuration

-   HTTP link setup with authentication
-   Cache configuration with type policies
-   Error policies for graceful error handling
-   Default options for consistent behavior

### 2. Query Patterns

-   useQuery for immediate data fetching
-   useLazyQuery for conditional data fetching
-   Variables for dynamic queries
-   Fragments for reusable query parts

### 3. Error Handling

-   Network error detection
-   GraphQL error parsing
-   Partial data rendering
-   Retry functionality

### 4. Performance Optimization

-   Cache-first fetch policy
-   Component lazy loading
-   Query result optimization
-   Network status tracking

### 5. UI/UX Best Practices

-   Loading state management
-   Error state handling
-   Search and filter implementation
-   Responsive design patterns

## Testing the Application

### Manual Testing Scenarios

1. Basic Functionality

    - Load the application and verify countries display
    - Test search functionality with country names
    - Test continent filtering

2. Error Handling

    - Disconnect internet and test error states
    - Test retry functionality
    - Verify partial data rendering

3. Performance

    - Test lazy loading by clicking "Show Details"
    - Verify caching by navigating and returning
    - Test search performance with large datasets

4. Responsive Design
    - Test on mobile devices
    - Verify touch interactions
    - Check layout on different screen sizes

## Advanced Features to Explore

### 1. Mutations (Not available in this API)

```javascript
const CREATE_COUNTRY = gql`
    mutation CreateCountry($input: CountryInput!) {
        createCountry(input: $input) {
            code
            name
        }
    }
`;
```

### 2. Subscriptions (Not available in this API)

```javascript
const COUNTRY_ADDED = gql`
    subscription OnCountryAdded {
        countryAdded {
            code
            name
        }
    }
`;
```

### 3. Advanced Caching

```javascript
// Custom cache policies
const cache = new InMemoryCache({
    typePolicies: {
        Country: {
            fields: {
                languages: { merge: false },
            },
        },
    },
});
```

## Additional Resources

-   [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
-   [GraphQL Official Documentation](https://graphql.org/learn/)
-   [React GraphQL Best Practices](https://www.apollographql.com/blog/apollo-client/best-practices/)
-   [GraphQL Caching Guide](https://www.apollographql.com/docs/react/caching/cache-configuration/)
