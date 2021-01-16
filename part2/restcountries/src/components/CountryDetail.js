import React from 'react'

function CountryDetail({country, weatherData}) {
    return (
        <>
            <div>
                <h2>
                <span>{country.name}</span>
                </h2>
                <h5>
                    Capital: {country.capital}
                </h5>
            </div>
            <div>
                <h4>Stats</h4>
            </div>
            <div>
            <img src={country.flag} alt={country.name} width="50" height="50" /> 
            </div>
            <div>
                <div>Region: {country.region}</div>
                <div>Population: {country.population}</div>
            </div>
            <div>
                <h5>Languages Spoken: </h5>
               <ul>
                {country.languages.map(lang => (
                    <li key={lang.name}>{lang.name} </li>
                ))} 
               </ul>
            </div>
            <div>
                <h5>Currencies: </h5>
               <ul>
                {country.currencies.map(curr => (
                    <li key={curr.name}>
                        <div>Name: {curr.name}</div>
                        <div>Code: {curr.code}</div>
                        <div>Symbol: {curr.symbol}</div>
                    </li>
                ))} 
               </ul>
            </div>
            {weatherData && (
                <>
                    <div>
                        <h4>Weather Data</h4>
                    </div>
                    <div>
                        {weatherData.current.weather_icons.map((icon, index) => (
                            <div key={index}>
                                <img src={icon} alt="Weather Icon"/>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div>Location: {weatherData.location.name}</div>
                        <div>Temperature: {weatherData.current.temperature}</div>
                        <div>Humidity: {weatherData.current.humidity}</div>
                        <div>Feels Like: {weatherData.current.feelslike}</div>
                        <div>Wind Speed: {weatherData.current.wind_speed}</div>
                    </div>
                </>
            )}
        </>

    )
}

export default CountryDetail
