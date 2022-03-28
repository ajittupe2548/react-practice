import React, { Component } from 'react';
import Accordion from './Accordion';

class CHome extends Component {
    render() {
        return (
            <div>
                <Accordion onChange={value => console.log(value)}>
                    <div className="accor">
                        <div className="head">Head 1</div>
                        <div className="body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                    <div className="accor">
                        <div className="head">Head 2</div>
                        <div className="body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </Accordion>
            </div>
        )
    }
}

export default CHome;