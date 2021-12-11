import React, { Component } from 'react'
import Table from './Table';

class CHome extends Component {
    render() {
        return (
            <div>
                <h1 className="heading">Hi from home page class</h1>
                <Table/>
            </div>
        )
    }
}

export default CHome;