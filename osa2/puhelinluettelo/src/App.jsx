import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notifyMessage, setNotifyMessage] = useState(null)

  useEffect(() => {
    phonebookService
    .getAll()
      .then(initialPhonebook => {
      setPersons(initialPhonebook)
    })
  }, [])

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const possibleEntry = persons.filter(person =>
      person.name === newName
    )

    if (possibleEntry.length !== 0) {
          if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
            phonebookService
            .update(possibleEntry[0].id, newPerson)
            .then(updatedPerson => {
              setPersons(persons.map(person =>
                person.id !== possibleEntry[0].id ? person : updatedPerson))
              setNotifyMessage(`Updated new number for ${newName}`)
              setTimeout(() => {
                setNotifyMessage(null)
              }, 3000)
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setNotifyMessage(`Error: ${error.response.data.error}`)
              setTimeout(() => {
                setNotifyMessage(null)
              }, 3000)
            })
          } else {return}
      } else {

    phonebookService
      .create(newPerson)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotifyMessage(`Added ${newName}`)
        setTimeout(() => {
          setNotifyMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setNotifyMessage(`Error: ${error.response.data.error}`)
        setTimeout(() => {
          setNotifyMessage(null)
        }, 3000)
      })
  }
}

  const removePerson = (id) => {
    const personToRemove = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      phonebookService.deleteEntry(id)
      .then(response => {
        setPersons(persons.filter(person =>
          person.id !== personToRemove.id))
        setNotifyMessage(`${personToRemove.name} removed`)
        setTimeout(() => {
          setNotifyMessage(null)
        }, 3000)
      })
      .catch(error => {
        setNotifyMessage(`Error: ${personToRemove.name} was already removed from the server`)
        setTimeout(() => {
          setNotifyMessage(null)
        }, 3000)
      })
    }
  }

  const handlePersonName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notifyMessage} />

      <Filter value={filter} handleFilter={handleFilter} />

      <h3>Add new</h3>

      <PersonForm
      addPerson={addPerson}
      newName={newName}
      handlePersonName={handlePersonName}
      newNumber={newNumber}
      handleNumber={handleNumber}
      />

      <h3>Numbers</h3>

      <Persons phonebook={personsToShow}
      removePerson={removePerson}
      />
    </div>
  )
}

export default App