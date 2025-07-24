const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Country type - exactly matching the external API
  type Country {
    code: ID!
    name: String!
    native: String!
    phone: String!
    continent: Continent!
    capital: String
    currency: String
    languages: [Language!]!
    emoji: String!
    emojiU: String!
    states: [State!]!
  }

  # Continent type - exactly matching the external API
  type Continent {
    code: String!
    name: String!
    countries: [Country!]!
  }

  # Language type - exactly matching the external API
  type Language {
    code: String!
    name: String!
    native: String!
    rtl: Boolean!
  }

  # State type - exactly matching the external API
  type State {
    code: String
    name: String!
    country: Country!
  }

  # Query type - exactly matching the external API
  type Query {
    countries: [Country!]!
    country(code: ID!): Country
    continents: [Continent!]!
    continent(code: ID!): Continent
    languages: [Language!]!
    language(code: ID!): Language
  }
`;

module.exports = { typeDefs };
