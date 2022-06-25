import { useState } from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({ saveBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const saveBlogForm = async (event) => {
    event.preventDefault()
    const newBlog = {
      author: blogAuthor,
      title: blogTitle,
      url: blogUrl
    }
    await saveBlog(newBlog)
    setBlogUrl('')
    setBlogAuthor('')
    setBlogTitle('')
  }
  return (
    <div>
      <form onSubmit={saveBlogForm}>
        <div>Title: <input type="text" placeholder="Title" value={blogTitle}
          onInput={({ target }) => setBlogTitle(target.value)}/></div>
        <div>Author: <input type="text" placeholder="Author" value={blogAuthor}
          onInput={({ target }) => setBlogAuthor(target.value)}/></div>
        <div>Url: <input type="text" placeholder="Url" value={blogUrl}
          onInput={({ target }) => setBlogUrl(target.value)}/>
        </div>
        <div>
          <button>Save blog</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  saveBlog: PropTypes.func.isRequired,
}

export default BlogForm