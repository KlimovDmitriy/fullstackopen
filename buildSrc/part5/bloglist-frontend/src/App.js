//TODO 5.13-5.22

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const resolve = await loginService.login({ username, password })
      setUsername('')
      setPassword('')
      window.localStorage.setItem('user', JSON.stringify(resolve))
      blogService.setToken(resolve.token)
      setUser(resolve)
    } catch (e) {
      console.log(e)
    }

  }

  const saveBlog = async (blog) => {
    try {
      const resolve = await blogService.create(blog)
      setBlogs(blogs.concat(resolve))
      blogFormRef.current.toggleVisible()
      showNotification(`You added ${blog.title}`)
    } catch (e) {
      console.log(e)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const resolve = await blogService.update(blog)
      setBlogs(blogs.concat(resolve))
      showNotification(`You update ${blog.title}`)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (e) {
      console.log(e)
    }
  }

  const showNotification = (text) => {
    console.log(text)
    setNotification(text)
    console.log(notification)
    setTimeout(() => setNotification(null), 5000)
  }


  if (user === null) {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" value={username} placeholder="Username"
              onInput={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" value={password} placeholder="Password"
              onInput={({ target }) => setPassword(target.value)}/>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification text={notification} />
      <div>{user.name} logged in <button onClick={() => {
        window.localStorage.removeItem('user')
        setUser(null)
      }}>Logout</button></div>
      <h3>Create new blog</h3>
      <Toggleable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm saveBlog={saveBlog}/>
      </Toggleable>
      <div>
        {blogs.filter(blog => blog.user.username === user.username)
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
          )}
      </div>
    </div>
  )
}

export default App
