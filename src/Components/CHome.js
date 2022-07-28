import React, { Component } from 'react'

class CHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameValue: '',
            essayValue: 'Started essay with few words!',
            selectValue: 'coconut'
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = event.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = (event) => {
        console.log(this.state.nameValue, this.state.essayValue, this.state.selectValue);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1 className="heading">Hi from home page class</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* The input Tag */}
                    <label>
                        Name:&nbsp;
                        <input name="nameValue" type="text" value={this.state.nameValue} onChange={this.handleChange}/>
                    </label>
                    {/* The textarea Tag */}
                    <label>
                        Essay:
                        <textarea name="essayValue" value={this.state.essayValue} onChange={this.handleChange} />
                    </label>
                    {/* The select Tag */}
                    <label>
                        Pick your favorite flavor:
                        <select name="selectValue" value={this.state.selectValue} onChange={this.handleChange}>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                        </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default CHome;