import React, { Component, useEffect, useState } from 'react'

/*
1. Don’t stop the data flow
    1. Don’t Stop the Data Flow in Rendering
        - components should directly use props passed to them and avoid copying props into state to ensure the component reflects updates accurately.
        - Copying props into state can cause the component to ignore updates, leading to stale values and incorrect rendering behavior. We can name such props as initiaColor or defaultColor to clarify that changes to it are ignored.
        - For expensive computations based on props, memoization should be used (e.g., using useMemo in function components) to optimize performance without losing reactivity to prop changes.

    2. Don’t Stop the Data Flow in Side Effects
        -To ensure that side effects (like data fetching) respect changes to props, avoid relying solely on componentDidMount. Instead, use componentDidUpdate to re-run side effects whenever relevant props or state change.

        - Both props and state should be considered part of the React data flow, meaning side effects must be responsive to changes in either to prevent bugs.

        - The useEffect Hook in function components simplifies managing side effects by making dependencies explicit, allowing for easier consistency checks and reducing the likelihood of bugs.

        - The useEffect API, combined with linter rules, encourages consistency and makes React components more resilient to changes, compared to managing updates in class components.

    3. Don’t Stop the Data Flow in Optimizations
        - Custom optimizations in React, like manual shouldComponentUpdate or custom React.memo() comparisons, can miss updates, especially with function props like onClick.

        - In class components, stable method identities can mask these issues, leading to bugs when functions change but the component uses outdated references.

        - Use React's default shallow comparison in PureComponent or React.memo() to handle function prop changes automatically. If customizing, include function props in comparisons.
*/

function ButtonFunctional({ color }) {
    const [colorState, setColorState] = useState(color);

    // console.log(`*****Output is :  => ButtonFunctional => ButtonFunctional:`, color);

    useEffect(() => {
        setColorState(color);
    }, [color]);

    return (
        <div>Function: {colorState}</div>
    )
}

class Button extends Component {
    state = {
        color: this.props.color,
    }

    /* This will keep props and state in sync but it will render component twice for prop change and state change too. */
    // componentDidUpdate(prevProps) {
    //     if (prevProps.color !== this.props.color) {
    //         this.setState({
    //             color: this.props.color,
    //         })
    //     }
    // }

    /* To fix re-render issue we can use getDerivedStateFromProps lifecycle it will update state before render itself. #TODO: Check this implementation in function component */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.color !== prevState.color) {
            return {
                color: nextProps.color,
            }
        }

        return null;
    }

    render() {
        // console.log(`*****Output is :  => Button => render => this.state.color:`, this.state.color)
        return (
            <div>Class: {this.state.color}</div>
        )
    }
}

class DataFlow1 extends Component {
    state = {
        isOk: true,
    }

    handleToggleClick = () => {
        this.setState(prev => ({
            isOk: !prev.isOk,
        }))

    }
    render() {
        return (
            <>
                <p>Data flow rendering start</p>
                <button onClick={this.handleToggleClick}>Toggle</button>
                <Button color={this.state.isOk ? 'blue' : 'red'} />
                <ButtonFunctional color={this.state.isOk ? 'blue' : 'red'} />
                <p>Data flow rendering end</p>
            </>
        )
    }
}

class ButtonDataFlow3 extends React.Component {
    shouldComponentUpdate(prevProps) {
        // 🔴 Doesn't compare this.props.onClick
        return this.props.color !== prevProps.color;
    }

    render() {
        const onClick = this.props.onClick; // 🔴 Doesn't reflect updates
        const textColor = this.props.color;
        console.log(`*****Output is :  => ButtonDataFlow2 => render => textColor:`, textColor)
        return (
            <button
                onClick={onClick}
                className={'Button-' + this.props.color + ' Button-text-' + textColor}>
                {this.props.children}
            </button>
        );
    }
}

class DataFlow3 extends Component {
    state = {
        isEnabled: true
    };

    handleClick = () => {
        this.setState({ isEnabled: false });
    }

    render() {
        return (
            <>
                <ButtonDataFlow3 color='green' onClick={
                    // 🔴 Button ignores updates to the onClick prop
                    this.state.isEnabled ? this.handleClick : null
                }>
                    Press me
                </ButtonDataFlow3>
            </>
        )
    }
}

export default class DataFlow extends Component {

    render() {
        return (
            <>
                {/* <DataFlow1 /> */}
                <DataFlow3 />
            </>
        )
    }
}
