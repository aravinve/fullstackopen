import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';
import Notification from './components/Notification';
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
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  useEffect(() => {
    setLoading(true)
    personService.getAll().then(result => {
      setPersons(result)
      setLoading(false)
      setNotification({
        message: 'Loaded Contacts Successfully',
        type: 'success'
      })
      resetNotification()
    }).catch(e => {
      setPersons([])
      setLoading(false)
      setNotification({
        message: `Error: ${e.message}`,
        type: 'danger'
      })
      resetNotification()
    })
  }, [])

  const resetNotification = () => {
    setTimeout(() => {
      setNotification({
        message: null,
        type: null
      })
    }, 5000)
  }

  const handleContactNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleContactNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const validateEntry = (name, number) => {
    const targetPerson = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
    if(targetPerson !== undefined){
      if(targetPerson.number !== number){
        const updateNumberConfirmation = window.confirm(`Do you want to update ${targetPerson.name}'s number from ${targetPerson.number} to ${number}`)
        if(updateNumberConfirmation){
          const updatedPerson = {...targetPerson, number: number}
          personService.update(targetPerson.id, updatedPerson).then(result => {
            setPersons(persons.map(person => person.id !== result.id ? person : result))
            setNotification({
              message: `Updated ${result.name} Contact Successfully`,
              type: 'success'
            })
            resetNotification()
            setNewName('')
            setNewNumber('')
          }).catch(e => {
            setNewName('')
            setNewNumber('')
            setNotification({
              message: `Error: ${e.message}`,
              type: 'danger'
            })
            resetNotification()
          })
        }
      } else {
        setNotification({
          message: `${name} already present in the phonebook with number: ${number}`,
          type: 'danger'
        })
        resetNotification()
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
        setNotification({
          message: `Created ${result.name} Contact Successfully`,
          type: 'success'
        })
        resetNotification()
        setNewName('')
        setNewNumber('')
      }).catch(e => {
        setNewName('')
        setNewNumber('')
        setNotification({
          message: `Error: ${e.message}`,
          type: 'danger'
        })
        resetNotification()
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
        setNotification({
          message: `Deleted ${personObj.name} Contact Successfully`,
          type: 'success'
        })
        resetNotification()
      }).catch(e => {
        setNotification({
          message: `Error: ${e.message}`,
          type: 'danger'
        })
        resetNotification()
      })
    }
  }

  return (
   <>
    <h1>Phone Book App</h1>
    {notification.message && <Notification message={notification.message} type={notification.type} />}
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
