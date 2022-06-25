import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => setVisible(!visible)
  const showThenVisible = { display: visible ? '' : 'none' }
  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: ++blog.likes }
    updateBlog(updatedBlog)
  }
  const removeBlog = () => {
    if (confirm(`Are you sure you want to delete ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }
  return (
    <div style= { blogStyle } >
      <p>{blog.title} {blog.author}
        <button onClick={toggleVisible}>{ visible ? 'hide' : 'view' }</button>
      </p>
      <div style={showThenVisible}>
        <p> { blog.url } </p>
        <p>likes: {blog.likes}
          <button onClick={likeBlog}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <p><button onClick={removeBlog}>remove</button> </p>
      </div>
    </div>
  )
}

export default Blog