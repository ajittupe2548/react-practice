import React, { Component } from 'react'
import axios from "axios"

class CHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            errorMsg: '',
        }
    }

    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                this.setState({ posts: response.data })
            })
            .catch((error) => {
                this.setState({errorMsg: "Something went wrong!"})
            })
    }
    render() {
        const { posts, errorMsg } = this.state;
        return (
            <div>
                <h1>Post List</h1>
                {posts.length ?
                    posts.map(post => <div key={post.id}>{post.title}</div>) :
                    null
                }
                {
                    errorMsg ? <div>{errorMsg}</div> : null
                }
            </div>
        )
    }
}

export default CHome;