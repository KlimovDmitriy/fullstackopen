const express = require('express')
const app = express()
const cors = require('cors')
const {MONGODB_URL} = require('./utils/config')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
mongoose.connect(MONGODB_URL)
app.use(cors())
app.use(express.json())
app.use('/', blogsRouter)

module.exports = app