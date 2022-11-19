import React, { Component } from 'react'
import PropTypes from 'prop-types';

class CHome extends Component {
    render() {
        return (
            <div>
                <h1 className="heading">Hi {this.props.name}</h1>
            </div>
        )
    }
}

CHome.propTypes = {
    name: PropTypes.string
}

CHome.defaultProps = {
    name: 'Stranger'
};

export default CHome;
