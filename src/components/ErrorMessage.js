import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ error, onRetry }) => {
    const getErrorMessage = (error) => {
        if (error.networkError) {
            return `Network Error: ${error.networkError.message}`;
        }

        if (error.graphQLErrors?.length > 0) {
            return error.graphQLErrors
                .map(err => err.message)
                .join(', ');
        }

        return error.message || 'An unexpected error occurred';
    };

    return (
        <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p className="error-message">{getErrorMessage(error)}</p>

            {error.graphQLErrors?.length > 0 && (
                <details className="error-details">
                    <summary>Technical Details</summary>
                    <pre>{JSON.stringify(error.graphQLErrors, null, 2)}</pre>
                </details>
            )}

            {onRetry && (
                <button onClick={onRetry} className="retry-btn">
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
