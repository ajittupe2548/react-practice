import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../apollo/queries';
import CountryCard from './CountryCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './CountryList.css';

const CountryList = ({ searchTerm, selectedContinent }) => {
    const { loading, error, data, refetch, networkStatus } = useQuery(GET_COUNTRIES, {
        notifyOnNetworkStatusChange: true,
        errorPolicy: 'all',
        // Variables can be passed here
        // variables: { limit: 10 },
    });

    // Handle loading state
    if (loading && !data) {
        return <LoadingSpinner message="Loading countries..." />;
    }

    // Handle error state
    if (error && !data) {
        return (
            <ErrorMessage
                error={error}
                onRetry={() => refetch()}
            />
        );
    }

    // Filter countries based on search term and continent
    const filteredCountries = data?.countries?.filter(country => {
        const matchesSearch = !searchTerm ||
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.code.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesContinent = !selectedContinent ||
            country.continent?.code === selectedContinent;

        return matchesSearch && matchesContinent;
    }) || [];

    return (
        <div className="country-list">
            <div className="country-list-header">
                <h2>Countries ({filteredCountries.length})</h2>
                <button
                    onClick={() => refetch()}
                    disabled={loading}
                    className="refresh-btn"
                >
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {/* Show partial error if there's error but also data */}
            {error && data && (
                <div className="warning-message">
                    Warning: Some data might be incomplete due to network issues.
                </div>
            )}

            {/* Show network status */}
            {networkStatus === 4 && (
                <div className="info-message">
                    Refetching data...
                </div>
            )}

            {filteredCountries.length === 0 ? (
                <div className="no-results">
                    <p>No countries found matching your criteria.</p>
                    {searchTerm && (
                        <p>Try searching for: "India", "United States", "Japan", etc.</p>
                    )}
                </div>
            ) : (
                <div className="countries-grid">
                    {filteredCountries.map((country) => (
                        <CountryCard
                            key={country.code}
                            country={country}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CountryList;
