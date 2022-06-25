const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = require('express').Router()

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, SECRET)
  const userId = decodedToken.id
  const user = await User.findById(userId)


  const blog = new Blog({
    title: body.title,
    user: userId,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    author: body.author
  })

  const savedBlog = await blog.save()
  const populatedBlog = await savedBlog.populate('user', {username: 1, name: 1})
  user.blogs = user.blogs.concat(savedBlog)
  await user.save();
  response.status(201).json(populatedBlog)
})

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, SECRET)
  const userId = decodedToken.id

  const blog = {
    title: body.title,
    user: userId,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    author: body.author
  }
  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  // const savedBlog = await blog.findOneAndUpdate({id: body.id}, blog)
  // const populatedBlog = await savedBlog.populate('user', {username: 1, name: 1})

  response.json(savedBlog)
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, SECRET)
  const userId = decodedToken.id

  const savedBlog = await Blog.findByIdAndDelete(request.params.id, {new: true})
  // const savedBlog = await blog.findOneAndUpdate({id: body.id}, blog)
  // const populatedBlog = await savedBlog.populate('user', {username: 1, name: 1})

  response.status(204).end()
})

module.exports = blogsRouter