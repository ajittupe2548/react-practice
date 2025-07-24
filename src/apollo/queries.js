import { gql } from '@apollo/client';

// Query to get all countries
export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
      capital
      currency
      phone
      continent {
        name
        code
      }
    }
  }
`;

// Query to get a specific country by code
export const GET_COUNTRY_BY_CODE = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      capital
      currency
      phone
      continent {
        name
        code
      }
      languages {
        code
        name
        native
      }
      states {
        code
        name
      }
    }
  }
`;

// Query to get countries by continent
export const GET_COUNTRIES_BY_CONTINENT = gql`
  query GetCountriesByContinent($continentCode: String!) {
    continent(code: $continentCode) {
      name
      countries {
        code
        name
        emoji
        capital
        currency
      }
    }
  }
`;

// Query with variables and fragments
export const GET_COUNTRIES_WITH_FRAGMENT = gql`
  fragment CountryInfo on Country {
    code
    name
    emoji
    capital
    currency
  }

  fragment ContinentInfo on Continent {
    name
    code
  }

  query GetCountriesWithFragment($limit: Int) {
    countries {
      ...CountryInfo
      continent {
        ...ContinentInfo
      }
    }
  }
`;

// Query for search functionality
export const SEARCH_COUNTRIES = gql`
  query SearchCountries {
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

// Example mutation (Note: This API doesn't support mutations, but here's the structure)
export const CREATE_COUNTRY = gql`
  mutation CreateCountry($input: CountryInput!) {
    createCountry(input: $input) {
      code
      name
      emoji
      capital
      currency
    }
  }
`;

// Example subscription (Note: This API doesn't support subscriptions, but here's the structure)
export const COUNTRY_ADDED_SUBSCRIPTION = gql`
  subscription OnCountryAdded {
    countryAdded {
      code
      name
      emoji
      capital
    }
  }
`;
