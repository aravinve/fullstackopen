import React from 'react'

function Filter({handleSearchInput}) {
    return (
        <>
            <h2>Filter Contacts</h2>
            <div>
                <input type="text" onChange={handleSearchInput} />
            </div>
        </>
    )
}

export default Filter
