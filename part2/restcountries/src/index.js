import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Filter from './components/Filter';
import Countries from './components/Countries';
import axios from 'axios';
import UserAlert from './components/UserAlert';
import CountryDetail from './components/CountryDetail';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showDetail, setShowDetail] = useState({
    display: false,
    data: null
  })

  useEffect(() => {
    setLoading(true)
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data)
      setLoading(false)
    })
  }, [])

  const handleSearchInput = (e) => {
    const searchCountry = e.target.value.toLowerCase()
    if(searchCountry !== ''){
      const filteredCountriesArray = countries.filter(country => country.name.toLowerCase().includes(searchCountry))
      if(filteredCountriesArray.length > 10){
        setShowDetail({
          display: false,
          data: null
        })
        setMessage('Too Many Matches Specify Another Filter')
        setFilteredCountries([])
      } else if (filteredCountriesArray.length <= 0) {
        setShowDetail({
          display: false,
          data: null
        })
        setMessage('Country Not Found!')
        setFilteredCountries([])
      } else if (filteredCountriesArray.length === 1) {
        setFilteredCountries([])
        setShowDetail({
          display: true,
          data: filteredCountriesArray[0]
        })
      } else {
        setShowDetail({
          display: false,
          data: null
        })
        setMessage('')
        setFilteredCountries(filteredCountriesArray)
      }
    } else {
      setShowDetail({
        display: false,
        data: null
      })
      setMessage('')
      setFilteredCountries([])
    }
  }

  return (
   <>
    <h1>Rest Countries App</h1>
    <Filter handleSearchInput={handleSearchInput} />
    <UserAlert message={message} />
    {
      showDetail.display && showDetail.data ? (<CountryDetail country={showDetail.data} />) : 
      (<Countries filteredCountries={filteredCountries} loadingStatus={loading} />)
    }
   </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
