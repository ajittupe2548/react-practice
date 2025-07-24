import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../apollo/queries';
import './SearchAndFilter.css';

const SearchAndFilter = ({ onSearchChange, onContinentChange, searchTerm, selectedContinent }) => {
    const [continents, setContinents] = useState([]);

    // Get countries to extract unique continents
    const { data } = useQuery(GET_COUNTRIES);

    useEffect(() => {
        if (data?.countries) {
            const uniqueContinents = data.countries
                .map(country => country.continent)
                .filter(continent => continent) // Remove null/undefined
                .reduce((acc, continent) => {
                    if (!acc.find(c => c.code === continent.code)) {
                        acc.push(continent);
                    }
                    return acc;
                }, [])
                .sort((a, b) => a.name.localeCompare(b.name));

            setContinents(uniqueContinents);
        }
    }, [data]);

    const handleSearchChange = (e) => {
        onSearchChange(e.target.value);
    };

    const handleContinentChange = (e) => {
        onContinentChange(e.target.value);
    };

    const clearFilters = () => {
        onSearchChange('');
        onContinentChange('');
    };

    return (
        <div className="search-filter-container">
            <div className="search-section">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search countries by name or code..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>
            </div>

            <div className="filter-section">
                <select
                    value={selectedContinent}
                    onChange={handleContinentChange}
                    className="continent-select"
                >
                    <option value="">All Continents</option>
                    {continents.map(continent => (
                        <option key={continent.code} value={continent.code}>
                            {continent.name}
                        </option>
                    ))}
                </select>
            </div>

            {(searchTerm || selectedContinent) && (
                <button onClick={clearFilters} className="clear-filters-btn">
                    Clear Filters
                </button>
            )}

            <div className="active-filters">
                {searchTerm && (
                    <span className="filter-tag">
                        Search: "{searchTerm}"
                        <button onClick={() => onSearchChange('')}>×</button>
                    </span>
                )}
                {selectedContinent && (
                    <span className="filter-tag">
                        Continent: {continents.find(c => c.code === selectedContinent)?.name}
                        <button onClick={() => onContinentChange('')}>×</button>
                    </span>
                )}
            </div>
        </div>
    );
};

export default SearchAndFilter;
