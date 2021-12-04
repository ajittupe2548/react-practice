import React, { Component } from 'react'
import { ThemeConsumer } from './ThemeContext'
import { UserConsumer } from './UserContext'

export default class CComponentB extends Component {
    render() {
        return (
            <ThemeConsumer>
                {theme => (
                    <UserConsumer>
                        {user => <div>Component B - {theme} - {user}</div>}
                    </UserConsumer>
                    )
                }
            </ThemeConsumer>
        )
    }
}
