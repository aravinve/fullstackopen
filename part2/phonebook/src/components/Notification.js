import React from 'react'

function Notification({message, type}) {
    const notificationStyle = `${type} notify-bar`
    return (
        <div className={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification
