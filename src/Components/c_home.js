import React, { Component } from 'react';
import CounterButton from './CounterButton';
import WordAdder from './ListOfWords';

class c_home extends Component {
    render() {
        console.log(`*****Output is :  => c_home => render => render`)
        return (
            <div>
                <h1 className="heading">Hi from home page class</h1>
                {/* <CounterButton/> */}
                <WordAdder/>
            </div>
        )
    }
}

export default c_home;