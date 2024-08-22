import React from 'react';

/*
In below example, the first behavior is the correct one. If I follow a person and then navigate to another person’s profile, my component shouldn’t get confused about who I followed. This class implementation is clearly buggy.

This class method reads from this.props.user. Props are immutable in React so they can never change. However, this is, and has always been, mutable.
*/

class ProfilePage extends React.Component {
    showMessage = (user) => {
        alert('Followed ' + user);
    };

    handleClick = () => {
        // setTimeout(() => this.showMessage(this.props.user), 3000);
        /* One way to do it would be to read this.props early during the event, and then explicitly pass them through into the timeout completion handler */
        const { user } = this.props;
        setTimeout(() => this.showMessage(user), 3000);
    };

    render() {
        return <button onClick={this.handleClick}>Follow</button>;
    }
}

export default ProfilePage;
