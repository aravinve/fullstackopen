import React from 'react'

function PersonForm({handleContactNameChange, contactName, contactNumber, handleContactNumberChange, submitFormHandler}) {
    return (
        <div>
            <h2>Contact Add Form</h2>
            <form onSubmit={submitFormHandler}>
                <input type="text" value={contactName} onChange={handleContactNameChange} 
                placeholder="Contact Name" required />
                <input type="number" value={contactNumber} onChange={handleContactNumberChange} 
                placeholder="Contact Number" required />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default PersonForm
