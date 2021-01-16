import React from 'react'

function Filter({handleSearchInput}) {
    return (
        <>
            <div>
                <input type="text" placeholder="Search ..." onChange={handleSearchInput} />
            </div>
        </>
    )
}

export default Filter
