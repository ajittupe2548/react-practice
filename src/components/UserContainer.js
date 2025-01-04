import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../redux'

function UserContainer({ userData, fetchUser }) {
    useEffect(() => {
        fetchUser();
    }, [fetchUser])
    return userData.isloading
        ? <h2>Loading...</h2>
        : userData.error
            ? <h2>{userData.error}</h2>
            : <div>
                <h2>Users</h2>
                {userData && userData.users && userData.users.map(user => <p key={user.name}>{user.name}</p>)}
            </div>
}

const mapStateToProps = state => {
    return {
        userData: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
