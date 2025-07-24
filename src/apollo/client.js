import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// GraphQL endpoint for custom server
// Ref: https://countries.trevorblades.com/
const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

// Create HTTP link to GraphQL endpoint
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});// Auth link for adding authentication headers (if needed)
const authLink = setContext((_, { headers }) => {
    // Get authentication token from localStorage
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

// Create Apollo Client instance
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Country: {
                fields: {
                    // Define how to handle pagination or caching for specific fields
                    languages: {
                        merge: false, // Replace the array instead of merging
                    }
                }
            }
        }
    }),
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all', // Show partial data even with errors
            notifyOnNetworkStatusChange: true, // Update loading state on network changes
        },
        query: {
            errorPolicy: 'all',
            fetchPolicy: 'cache-first', // Use cache when available
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});

export default client;
