import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([{
    name: 'John Doe',
    number: '3432291'
  },
    { name: 'Arto Hellas', number: '123456' },
    { name: 'Ada Lovelace', number: '5323523' },
    { name: 'Dan Abramov', number: '234345' },
    { name: 'Mary Poppen', number: '6423122' }
  ])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleContactNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleContactNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const validateName = (val) => {
    return persons.filter(person => person.name.toLowerCase() === val.toLowerCase()).length === 0
  }

  const submitFormHandler = (e) => {
    e.preventDefault()
    if(validateName(newName)){
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} already added to phonebook`)
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

  return (
   <>
    <h1>Phone Book App</h1>
    <Filter handleSearchInput={handleSearchInput} />
    <PersonForm submitFormHandler={submitFormHandler} contactName={newName} handleContactNameChange={handleContactNameChange} handleContactNumberChange={handleContactNumberChange} contactNumber={newNumber} />
    <Persons persons={persons} filteredPersons={filteredPersons} />
   </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
