const bcrypt = require('bcrypt');
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/api/users', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  return response.json(users)
})

usersRouter.post('/api/users', async (request, response, next) => {
  const {username, name, password} = request.body
  if (password.length < 3) {
    return response.status(400).json({error: 'Password must be at least 3 characters long'})
  }
  const existedUser = await User.findOne({username})
  if (existedUser) {
    return response.status(400).json({error: 'Username must be unique'})
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash
  })
  const result = await user.save();
  response.status(201).json(result)
})

module.exports = usersRouter