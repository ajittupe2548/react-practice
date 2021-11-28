import React, { Component } from 'react'

const element = React.createElement(
    'h1',
    {className: 'greeting',
    id: "heading"},
    'Hello, world!'
  );
class c_home extends Component {
    render() {
        return (
            <div>
                {element}
            </div>
        )
    }
}

export default c_home;