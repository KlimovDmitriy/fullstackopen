// TODO 3.8, 3.16
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const Person = require('./models/person');

morgan('tiny');

app.use(express.static('build'));
app.use(express.json());

app.use(morgan('combined'));
app.use(cors());

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => (person ? response.json(person) : response.status(404).end('Not found')));
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  });
});

app.post('/api/persons', (request, response) => {
  const person = new Person({
    name: request.body.name,
    number: Number(request.body.number),
  });
  if (!request.body.name || !request.body.number) {
    response.status(404).send({ error: 'Required fields is empty' }).end();
  }
  Person.find({ name: { $eq: request.body.name } }).then((foundPerson) => {
    if (foundPerson.length) {
      Person.findOneAndUpdate({ name: { $eq: person.name } }, {
        ...foundPerson,
        number: request.body.number,
      }).then((updatePerson) => response.json(updatePerson));
    } else {
      person.save().then((savedPerson) => {
        response.json(savedPerson);
      });
    }
  });
});

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`<p>Phonebook have entries for ${persons.length}</p><p>${new Date().toString()}</p>`);
  });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
