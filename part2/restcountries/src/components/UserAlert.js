import React from 'react'

function UserAlert({message}) {
    return (
       message !== null ? ( <div>
        <strong>{message}</strong>
    </div>) : null
    )
}

export default UserAlert
