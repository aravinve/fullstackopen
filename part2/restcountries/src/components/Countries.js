import React from 'react'
import Country from './Country'

function Countries({filteredCountries, loadingStatus, handleDetailClick}) {
    const targetCountriesArray = filteredCountries.length > 0 ? filteredCountries : []
    return (
        <>
           { !loadingStatus ? (targetCountriesArray.map(country => (
                <Country key={country.name} country={country} handleDetailClick={handleDetailClick} />
            ))) : 
            (  <div>
                    <h4>Loading ....</h4>
                </div>
            )
            }  
        </>
    )
}

export default Countries
