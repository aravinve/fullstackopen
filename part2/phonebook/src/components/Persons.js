import React from 'react'
import Person from './Person'

function Persons({persons, filteredPersons}) {
    const targetPersonArray = filteredPersons.length > 0 ? filteredPersons : persons
    return (
        <>
            <h2>Contacts</h2>
            <table>
                <tbody>
                    {
                        targetPersonArray.map(person => (
                            <Person key={person.name} person={person} />
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Persons
