import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notifMessage, setNotifMessage] = useState(null)
  const [ errorNot, setErrorNot] = useState(false)


  const addPerson = (event) => {
    event.preventDefault()
    const duplicatePerson = persons.find(person => person.name === newName)
    if(typeof(duplicatePerson) !== 'undefined'){
      if(duplicatePerson.number === newNumber){
        window.alert(`${newName} is already added to the phonebook with the same number`)
      }else{
        if(window.confirm(`${newName} is already added to the phonebook, 
        replace the old number with a new one?`)){

          const nameObject = {
            name: newName,
            number: newNumber
          }
          personsService
          .update(duplicatePerson.id, nameObject)
          .then(response => {
            const changedPersons = [ ...persons]
            changedPersons[changedPersons.indexOf(duplicatePerson)].number = newNumber
            setPersons(changedPersons)
            setErrorNot(false)
            setNotifMessage(`Updated phonenumber of  ${newName} to ${newNumber}`)
            setTimeout(() => {
              setNotifMessage(null)
            }, 4000)
          })
          .catch(error => {
            setErrorNot(true)
            setNotifMessage(`Information of ${duplicatePerson.name} has already been removed`)
            setPersons(persons.filter(pers => pers.id !== duplicatePerson.id))
          })
        }
      }
    }else{
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personsService
      .create(nameObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        setErrorNot(false)
        setNotifMessage(`Added ${newName}`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 4000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const delPerson = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)){
      personsService
      .del(person)
      .then(response => {
        console.log(response)
      })
      setPersons(persons.filter(pers => pers.id !== person.id))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notifMessage} error={errorNot}/>

      <Filter filter={filter} handler={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} delPerson={delPerson}/>

    </div>
  )
}

export default App