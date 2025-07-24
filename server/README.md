# Custom GraphQL Countries Server

A custom GraphQL server implementation using Apollo Server and Express, providing a comprehensive countries API with enhanced features.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Or production mode
   npm start
   ```

4. **Access GraphQL Playground**
   Open your browser and go to: `http://localhost:4000/graphql`

## 📋 Schema Overview

### Types

#### Country
```graphql
type Country {
  id: ID!
  code: String!
  name: String!
  emoji: String!
  capital: String
  currency: String
  phone: String
  continent: Continent!
  languages: [Language!]!
  states: [State!]!
  population: Int
  area: Float
  gdp: Float
  createdAt: String!
  updatedAt: String!
}
```

#### Continent
```graphql
type Continent {
  id: ID!
  code: String!
  name: String!
  countries: [Country!]!
}
```

#### Language
```graphql
type Language {
  id: ID!
  code: String!
  name: String!
  native: String!
  countries: [Country!]!
}
```

#### State
```graphql
type State {
  id: ID!
  code: String!
  name: String!
  country: Country!
}
```

## 🔍 Available Queries

### Basic Queries
```graphql
# Get all countries
query {
  countries {
    code
    name
    emoji
    capital
    population
    continent {
      name
    }
  }
}

# Get specific country
query {
  country(code: "US") {
    name
    capital
    population
    languages {
      name
      native
    }
    states {
      name
    }
  }
}
```

### Advanced Queries
```graphql
# Search countries
query {
  searchCountries(query: "united") {
    code
    name
    emoji
    capital
  }
}

# Get countries by continent
query {
  countriesByContinent(continentCode: "AS") {
    name
    capital
    population
  }
}

# Get richest countries
query {
  richestCountries(limit: 5) {
    name
    gdp
    population
  }
}

# Get largest countries by area
query {
  largestCountries(limit: 5) {
    name
    area
    population
  }
}

# Filter by population range
query {
  countriesByPopulation(min: 100000000, max: 500000000) {
    name
    population
  }
}
```

### Statistics Queries
```graphql
query {
  totalCountries
  totalContinents
  totalLanguages
  worldPopulation
  averageGDP
}
```

## ✏️ Available Mutations

### Country Mutations
```graphql
# Create a new country
mutation {
  createCountry(input: {
    code: "XX"
    name: "Example Country"
    emoji: "🏴"
    capital: "Example City"
    currency: "EXC"
    phone: "+999"
    continentCode: "EU"
    population: 1000000
    area: 50000.0
    gdp: 100000000000
  }) {
    id
    name
    code
  }
}

# Update existing country
mutation {
  updateCountry(code: "XX", input: {
    name: "Updated Country Name"
    population: 1100000
  }) {
    name
    population
    updatedAt
  }
}

# Delete a country
mutation {
  deleteCountry(code: "XX")
}
```

### Language Mutations
```graphql
# Create a new language
mutation {
  createLanguage(input: {
    code: "ex"
    name: "Example Language"
    native: "Example Native"
    countryIds: ["1", "2"]
  }) {
    code
    name
    native
  }
}

# Add language to country
mutation {
  addLanguageToCountry(languageCode: "en", countryCode: "IN") {
    name
    languages {
      name
    }
  }
}
```

### State Mutations
```graphql
# Create a new state
mutation {
  createState(input: {
    code: "EX"
    name: "Example State"
    countryId: "1"
  }) {
    code
    name
    country {
      name
    }
  }
}
```

## 🗃️ Sample Data

The server comes pre-loaded with sample data including:

- **6 Countries**: US, India, UK, Japan, Brazil, Australia
- **7 Continents**: Asia, Europe, North America, South America, Africa, Oceania, Antarctica
- **5 Languages**: English, Hindi, Japanese, Portuguese, Spanish
- **14 States**: Various states/provinces from different countries

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:

```env
PORT=4000
NODE_ENV=development
```

### CORS Configuration
The server is configured to allow all origins for development. For production, update the CORS settings in `index.js`:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com']
}));
```

## 🚀 Features

### Enhanced Data
- **Population data** for demographic analysis
- **Area measurements** for geographic comparisons
- **GDP values** for economic analysis
- **Timestamps** for tracking data changes

### Advanced Filtering
- Search by name, code, or capital
- Filter by population range
- Sort by various criteria (GDP, area, population)
- Continent-based filtering

### Relationships
- Countries ↔ Continents (many-to-one)
- Countries ↔ Languages (many-to-many)
- Countries ↔ States (one-to-many)

### Real-time Capabilities
- GraphQL subscriptions for live updates
- Mutation notifications

## 🔄 Switching Between APIs

To switch between your custom server and the external Countries API:

1. **In `src/apollo/client.js`**:
   ```javascript
   // Use custom server
   const ACTIVE_ENDPOINT = ENDPOINTS.CUSTOM;

   // Or use external API
   const ACTIVE_ENDPOINT = ENDPOINTS.COUNTRIES;
   ```

2. **Update your queries**:
   - External API: Use queries from `queries.js`

## 📊 GraphQL Playground Examples

Once your server is running, visit `http://localhost:4000/graphql` to access the GraphQL Playground where you can:

1. **Explore the schema** using the schema tab
2. **Write and test queries** in the query editor
3. **View query results** in real-time
4. **Access documentation** for all available operations

## 🏗️ Extending the Server

### Adding New Types
1. Define the type in `schema.js`
2. Add resolvers in `resolvers.js`
3. Update relationships as needed

### Adding Database Integration
Replace the in-memory data store with a real database:

```javascript
// Example with MongoDB/Mongoose
const Country = require('./models/Country');

const resolvers = {
  Query: {
    countries: () => Country.find().populate('continent'),
    // ... other resolvers
  }
};
```

### Adding Authentication
```javascript
// In resolvers.js
const resolvers = {
  Mutation: {
    createCountry: (parent, { input }, context) => {
      if (!context.user || !context.user.isAdmin) {
        throw new AuthenticationError('Admin access required');
      }
      // ... create country logic
    }
  }
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   Error: listen EADDRINUSE: address already in use :::4000
   ```
   Solution: Change the port in `index.js` or kill the process using port 4000

2. **CORS errors**
   ```bash
   Access to fetch at 'http://localhost:4000/graphql' from origin 'http://localhost:3000' has been blocked by CORS policy
   ```
   Solution: Ensure CORS is properly configured in `index.js`

3. **Module not found**
   ```bash
   Cannot find module 'apollo-server-express'
   ```
   Solution: Run `npm install` in the server directory

### Development Tips

- Use `npm run dev` for auto-reload during development
- Check the GraphQL Playground for schema exploration
- Enable introspection and playground in development only
- Use proper error handling in production

---

This custom GraphQL server provides a solid foundation for learning GraphQL concepts while working with familiar country data that matches your existing frontend implementation!
