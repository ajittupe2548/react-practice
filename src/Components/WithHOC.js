import React from 'react';

function withHOC(WrappedComponent) {
    return ({
        errorText,
        successText,
        ...props
    }) => {
        return (
            <WrappedComponent {...(props)} />
        )
    }
}

export default withHOC;
