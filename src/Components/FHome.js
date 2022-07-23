import React from 'react'

// Lists and Keys
// Rendering Multiple Components - You can build collections of elements and include them in JSX using curly braces {}

function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return <li>{props.value}</li>;
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      // Correct! Key should be specified inside the array.
        <ListItem key={number.toString()} value={number} />
    );
    return (
        <ul>
        {listItems}
        </ul>
    );
}

function FHome() {
    const numbers = [1, 2, 3, 4, 5];
    return (
        <div>
            <h1>Hi from functional home page functional</h1>
            <NumberList numbers={numbers} />,
        </div>
    )
}

export default FHome;
