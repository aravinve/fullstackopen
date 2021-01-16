import React from 'react'

function Person({person, removeContactHandler}) {
  return (
            <tr>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td>
                  <button onClick={() => removeContactHandler(person)}>Remove</button>
                </td>
            </tr>
  )
   
}

export default Person
