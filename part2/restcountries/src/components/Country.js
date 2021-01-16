import React from 'react'

function Country({country, handleDetailClick}) {
  return (
            <div>
                <span>{country.name}</span>
                <span>
                  <button onClick={() => handleDetailClick(country)}>Show Details</button>
                </span>
            </div>
      )
   
}

export default Country
