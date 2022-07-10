import {useDispatch} from "react-redux";
import {addNewAnecdote} from "../reducers/anecdoteReducer";
import {hideNotification, showNotification} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(addNewAnecdote(anecdote))
    dispatch(showNotification(`You added ${anecdote}`))
    setTimeout(() => dispatch(hideNotification()), 5000)
    event.target.anecdote.value = ''
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm