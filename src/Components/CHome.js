import React, { Component } from 'react'

class CHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: 'Please click',
            count: 0,
        }
        this.btnRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        console.log(`*****Output is :  => CHome => constructor => constructor`)
    }

    componentDidMount() {
        console.log(`*****Output is :  => CHome => componentDidMount => componentDidMount`)
        this.btnRef.current.addEventListener("click",this.handleClick)
    }

    shouldComponentUpdate() {
        console.log(`*****Output is :  => CHome => shouldComponentUpdate => shouldComponentUpdate`)
        return true;
    }

    componentDidUpdate() {
        console.log(`*****Output is :  => CHome => componentDidUpdate => componentDidUpdate`)
    }

    componentWillUnmount() {
        console.log(`*****Output is :  => CHome => componentWillUnmount => componentWillUnmount`)
        this.btnRef.current.removeEventListener("click",this.handleClick)
    }

    handleClick() {
        this.setState({
            message: 'Thank you for clicking',
        })
    }
    render() {
        console.log(`*****Output is :  => CHome => render => render`)
        return (
            <div>
                <h1 className="heading">{this.state.message}</h1>
                <button ref={this.btnRef}>Click</button>
            </div>
        )
    }
}

export default CHome;