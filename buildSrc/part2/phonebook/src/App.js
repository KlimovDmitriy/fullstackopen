import {useEffect, useState} from 'react'
import PhonebookService from './services/PhonebookService'
import Phonebook from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [dbMessage, setDbMessage] = useState('')
  useEffect(() => {
    PhonebookService
      .getAllPersons()
      .then(data => {
        setPersons(data)
      })
  }, [])

  return (
    <div>
      <Phonebook values={{persons, newName, newPhone, filter, dbMessage}}
                 handlers={{setPersons, setNewName, setNewPhone, setFilter, setDbMessage}} service={PhonebookService}/>
    </div>
  )
}

export default App