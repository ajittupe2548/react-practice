import React, { Component } from 'react'

// Keys - Keys help React identify which items have changed, are added, or are removed.
// The best way to pick a key is to use a string that uniquely identifies a list item among its siblings.

// Keys Must Only Be Unique Among Siblings - Keys used within arrays should be unique among their siblings.

// Index as key anti pattern - https://codepen.io/gopinav/pen/gQpepq

// Use index as key only when -
// 1) The items in your list do not have a unique Id.
// 2) The list is a static list and will not change.
// 3) The list will never be reordered or filtered.

function Person({name}) {
    return (
        <>
            <h2>I am {name}.</h2>
        </>
    )
}

class CHome extends Component {
    render() {
        const persons = ["Clark", "Bruce", "Diana"];
        const personList = persons.map((name, index) => <Person name={name} key={index} />)
        return (
            <>
                {personList}
            </>
        )
    }
}

export default CHome;