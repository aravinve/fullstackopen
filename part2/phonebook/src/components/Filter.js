import React from 'react'

function Filter({handleSearchInput}) {
    return (
        <>
            <h2>Filter Contacts</h2>
            <div>
                <input type="text" placeholder="Search ..." onChange={handleSearchInput} />
            </div>
        </>
    )
}

export default Filter
