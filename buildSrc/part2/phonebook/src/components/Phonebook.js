const Persons = ({values, serviceDelete, handlers}) => {
  const deletePerson = (id) => {
    serviceDelete(id)
      .then(() => handlers.setPersons(values.persons.filter(el => el.id !== id)))
  }
  return (!values.filter
    ? values.persons.map((person) =>
      <p key={person.id}>{person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>Delete</button>
      </p>)
    : values.persons.filter(el => el.name.toLowerCase().includes(values.filter.toLowerCase()))
      .map(person => <p key={person.id}>{person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>Delete</button>
      </p>))

}

const Filter = ({values, handlers}) => {
  return <> filter: <input value={values.filter} onChange={(event) => handlers.setFilter(event.target.value)}/> </>
}

const PersonForm = ({values, handlers, service}) => {
  function addPersons(e) {
    e.preventDefault()
    if (values.persons.find(el => el.name === values.newName)) {
      alert(`${values.newName} is already added to phonebook`)
      return true
    }
    const person = {name: values.newName, number: values.newPhone}
    service.addPerson(person)
      .then(response => {
        handlers.setPersons(values.persons.concat(response))
        handlers.setNewName('')
        handlers.setNewPhone('')
        handlers.setDbMessage(`Added ${person.name}`)
        setTimeout(() => handlers.setDbMessage(''), 2000)
      })
  }

  return <form onSubmit={addPersons}>
    <div>
      name: <input value={values.newName} type="text" onChange={(event) => handlers.setNewName(event.target.value)}/>
    </div>
    <div>number: <input value={values.newPhone} type="text"
                        onChange={(event) => handlers.setNewPhone(event.target.value)}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

const DatabaseMessage = ({message}) => {
  return message ? <div>{message}</div> : <></>
}

const Phonebook = ({values, handlers, service}) => {
  const {persons, newName, newPhone, filter, dbMessage} = values
  const {setPersons, setNewName, setNewPhone, setFilter, setDbMessage} = handlers
  return (<>
    <h2>Phonebook</h2>
    <DatabaseMessage message={dbMessage}/>
    <Filter values={{filter}} handlers={{setFilter}}/>
    <h3>add new person</h3>
    <PersonForm values={{newName, newPhone, persons}} handlers={{setNewName, setNewPhone, setPersons, setDbMessage}}
                service={service}/>
    <h3>Numbers</h3>
    <Persons values={{persons, filter}} serviceDelete={service.deletePerson} handlers={{setPersons}}/>


  </>)
}

export default Phonebook