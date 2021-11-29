import React, { Component } from 'react'

class CHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameValue: '',
        }
    }

    handleNameChange = (event) => {
        this.setState({
            nameValue: event.target.value,
        })
    }

    handleSubmit = (event) => {
        console.log(this.state.nameValue);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1 className="heading">Hi from home page class</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:&nbsp;
                        <input type="text" value={this.state.nameValue} onChange={this.handleNameChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default CHome;