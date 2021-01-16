import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import './index.css';
import personService from './services/PersonsService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    personService.getAll().then(result => {
      setPersons(result)
      setLoading(false)
    })
  }, [])

  const handleContactNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleContactNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const validateEntry = (name, number) => {
    const targetPerson = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
    console.log(targetPerson)
    if(targetPerson !== undefined){
      if(targetPerson.number !== number){
        const updateNumberConfirmation = window.confirm(`Do you want to update ${targetPerson.name}'s number from ${targetPerson.number} to ${number}`)
        if(updateNumberConfirmation){
          const updatedPerson = {...targetPerson, number: number}
          personService.update(targetPerson.id, updatedPerson).then(result => {
            setPersons(persons.map(person => person.id !== result.id ? person : result))
            setNewName('')
            setNewNumber('')
          })
        }
      } else {
        alert(`${name} already present in the phonebook with number: ${number}`)
      }
    } else {
      return true
    }
  }

  const submitFormHandler = (e) => {
    e.preventDefault()
    if(validateEntry(newName, newNumber)){
      const newData = {name: newName, number: newNumber}
      personService.create(newData).then(result => {
        setPersons(persons.concat(result))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleSearchInput = (e) => {
    const searchName = e.target.value.toLowerCase()
    if(searchName !== ''){
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(searchName)))
    } else {
      setFilteredPersons([])
    }
  }

  const removeContactHandler = (personObj) => {
    const confirmation = window.confirm(`Do you want to delete ${personObj.name}`)
    if(confirmation){
      personService.remove(personObj.id).then(result => {
        setPersons(persons.filter(person => person.id !== personObj.id))
      })
    }
  }

  return (
   <>
    <h1>Phone Book App</h1>
    <Filter handleSearchInput={handleSearchInput} />
    <PersonForm submitFormHandler={submitFormHandler} contactName={newName} handleContactNameChange={handleContactNameChange} handleContactNumberChange={handleContactNumberChange} contactNumber={newNumber} />
    <Persons persons={persons} filteredPersons={filteredPersons} loadingStatus={loading} removeContactHandler={removeContactHandler} />
   </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
