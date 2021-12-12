import React, { Component } from 'react'
import axios from 'axios'

class AxiosPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            title: '',
            body: ''
        }
    }

    handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://jsonplaceholder.typicode.com/posts",this.state)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { userId, title, body } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    UserId: <input type="text" name="userId" value={userId} onChange={this.handleChange} />
                    Title: <input type="text" name="title" value={title} onChange={this.handleChange} />
                    Body: <input type="text" name="body" value={body} onChange={this.handleChange} />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default AxiosPost;