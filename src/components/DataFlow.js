import React, { Component, useEffect, useState } from 'react'

/*
1. Don’t stop the data flow
    1. Don’t Stop the Data Flow in Rendering
        - components should directly use props passed to them and avoid copying props into state to ensure the component reflects updates accurately.
        - Copying props into state can cause the component to ignore updates, leading to stale values and incorrect rendering behavior. We can name such props as initiaColor or defaultColor to clarify that changes to it are ignored.
        - For expensive computations based on props, memoization should be used (e.g., using useMemo in function components) to optimize performance without losing reactivity to prop changes.

2. Don’t Stop the Data Flow in Side Effects
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

export default class DataFlow extends Component {

    render() {
        return (
            <>
                <DataFlow1 />
            </>
        )
    }
}
