const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://Undalamarus:${password}@fullstackopen.dz9wy.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length > 4) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(response => {
    console.log(`Added ${response.name} number: ${response.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(response => {
    console.log('Phonebook:')
    response.forEach((person) => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
}


