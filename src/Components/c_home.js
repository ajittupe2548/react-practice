import React, { Component } from 'react'
import PropTypes from 'prop-types';

class c_home extends Component {
    render() {
        return (
            <div>
                <h1 className="heading">Hi {this.props.name}</h1>
            </div>
        )
    }
}

c_home.propTypes = {
    name: PropTypes.string
}

c_home.defaultProps = {
    name: 'Stranger'
};

export default c_home;