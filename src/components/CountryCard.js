import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_COUNTRY_BY_CODE } from '../apollo/queries';
import './CountryCard.css';

const CountryCard = ({ country }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [getCountryDetails, { loading, error, data }] = useLazyQuery(
        GET_COUNTRY_BY_CODE,
        {
            variables: { code: country.code },
            errorPolicy: 'all',
        }
    );

    const handleShowDetails = () => {
        if (!showDetails && !data) {
            getCountryDetails();
        }
        setShowDetails(!showDetails);
    };

    const countryDetails = data?.country;

    return (
        <div className="country-card">
            <div className="country-card-header">
                <span className="country-emoji">{country.emoji}</span>
                <div className="country-basic-info">
                    <h3 className="country-name">{country.name}</h3>
                    <p className="country-code">Code: {country.code}</p>
                </div>
            </div>

            <div className="country-card-body">
                <div className="country-info">
                    <p><strong>Capital:</strong> {country.capital || 'N/A'}</p>
                    <p><strong>Currency:</strong> {country.currency || 'N/A'}</p>
                    <p><strong>Phone Code:</strong> {country.phone || 'N/A'}</p>
                    <p><strong>Continent:</strong> {country.continent?.name || 'N/A'}</p>
                </div>

                <button
                    className="details-btn"
                    onClick={handleShowDetails}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : showDetails ? 'Hide Details' : 'Show Details'}
                </button>

                {showDetails && (
                    <div className="country-details">
                        {error && (
                            <div className="error-details">
                                Error loading details: {error.message}
                            </div>
                        )}

                        {countryDetails && (
                            <>
                                <div className="languages-section">
                                    <h4>Languages:</h4>
                                    {countryDetails.languages?.length > 0 ? (
                                        <ul className="languages-list">
                                            {countryDetails.languages.map((lang) => (
                                                <li key={lang.code}>
                                                    <strong>{lang.name}</strong> ({lang.native})
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No language information available</p>
                                    )}
                                </div>

                                <div className="states-section">
                                    <h4>States/Provinces:</h4>
                                    {countryDetails.states?.length > 0 ? (
                                        <div className="states-grid">
                                            {countryDetails.states.slice(0, 6).map((state) => (
                                                <span key={state.code} className="state-tag">
                                                    {state.name}
                                                </span>
                                            ))}
                                            {countryDetails.states.length > 6 && (
                                                <span className="state-tag more">
                                                    +{countryDetails.states.length - 6} more
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <p>No state information available</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountryCard;
