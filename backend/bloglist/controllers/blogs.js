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
    content: body.content,
    user: userId,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save();
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter