import { gql } from '@apollo/client';

// === CUSTOM COUNTRIES SERVER QUERIES (matching external API exactly) ===

// Get all countries
export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      native
      phone
      capital
      currency
      emoji
      emojiU
      continent {
        code
        name
      }
      languages {
        code
        name
        native
        rtl
      }
      states {
        code
        name
      }
    }
  }
`;

// Get country by code
export const GET_COUNTRY_BY_CODE = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      code
      name
      native
      phone
      capital
      currency
      emoji
      emojiU
      continent {
        code
        name
      }
      languages {
        code
        name
        native
        rtl
      }
      states {
        code
        name
      }
    }
  }
`;

// Get all continents
export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
      countries {
        code
        name
        emoji
      }
    }
  }
`;

// Get continent by code
export const GET_CONTINENT_BY_CODE = gql`
  query GetContinentByCode($code: ID!) {
    continent(code: $code) {
      code
      name
      countries {
        code
        name
        native
        emoji
        capital
        currency
      }
    }
  }
`;

// Get all languages
export const GET_LANGUAGES = gql`
  query GetLanguages {
    languages {
      code
      name
      native
      rtl
    }
  }
`;

// Get language by code
export const GET_LANGUAGE_BY_CODE = gql`
  query GetLanguageByCode($code: ID!) {
    language(code: $code) {
      code
      name
      native
      rtl
    }
  }
`;
