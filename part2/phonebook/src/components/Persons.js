import React from 'react'
import Person from './Person'

function Persons({persons, filteredPersons, loadingStatus}) {
    const targetPersonArray = filteredPersons.length > 0 ? filteredPersons : persons
    return (
        <>
            <h2>Contacts</h2>
            {!loadingStatus ? (<table>
                <tbody>
                    {
                        targetPersonArray.map(person => (
                            <Person key={person.name} person={person} />
                        ))
                    }
                </tbody>
            </table>) : (<>
            <div>
                <h4>Loading ....</h4>
            </div>
            </>)}
            
        </>
    )
}

export default Persons
