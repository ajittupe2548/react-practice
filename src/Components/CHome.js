import React, { Component } from 'react'
import ClickCounter from './ClickCounter';
import Counter from './Counter';
import HoverCounter from './HoverCounter';

class CHome extends Component {
    render() {
        return (
            <div>
                {/* <ClickCounter />
                <HoverCounter /> */}
                <Counter render={(count, incrementCount) => <ClickCounter count={count} incrementCount={incrementCount}/>} />
                <Counter render={(count, incrementCount) => <HoverCounter count={count} incrementCount={incrementCount}/>} />
            </div>
        )
    }
}

export default CHome;