const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {SECRET} = require('../utils/config');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const {username, password} = request.body;
  const user = await User.findOne({username});
  const isPasswordCorrect = user === false ? false : await bcrypt.compare(password, user.passwordHash);
  if (!user || !isPasswordCorrect) {
    return response.status(401).json({error: 'Password or username is incorrect'})
  }

  const userToken = {
    id: user._id,
    username: user.username,
  }

  const token = jwt.sign(userToken, SECRET)

  response
    .status(200)
    .send({token, username: user.username, name: user.name})
})

module.exports = loginRouter