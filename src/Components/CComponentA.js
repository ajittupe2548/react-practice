import React, { Component } from 'react'
import CComponentB from './CComponentB'

export default class CComponentA extends Component {
    render() {
        return (
            <div>
                <CComponentB />
            </div>
        )
    }
}
