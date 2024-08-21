import React from 'react';

function ProfilePage(props) {
    const showMessage = () => {
        alert('sFollowed ' + props.user);
    };

    const handleClick = () => {
        setTimeout(showMessage, 3000);
    };

    return (
        <button onClick={handleClick}>Follow</button>
    );
}

export default ProfilePage;
