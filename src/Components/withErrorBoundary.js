import React from 'react';

export const withErrorBoundry = WrappedComponent => {
    return class ErrorBoundry extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false, error: "" };
        }

        static getDerivedStateFromError(error) {
            return { hasError: true, error: error };
        }

        render() {
            if (this.state.hasError) {
                return <p>Something went wrong</p>;
            }
            return (
                <WrappedComponent
                    {...this.props}
                />
            );
        }
    };
};

const Comp1 = () => {
    return <div>Comp1</div>
}

const Comp2 = () => {
    return <div>Comp2 <Grand /></div>
}

const Grand = () => {
    throw new Error('Err');
    return <div>Grand</div>
}

const CompV2 = withErrorBoundry(Comp2);

function ErrorBoundaryExample() {
    return (
        <div className="App">
            <Comp1 />
            <CompV2 />
        </div>
    );
}

export default ErrorBoundaryExample;
