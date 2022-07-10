import {useDispatch} from "react-redux";
import {addNewAnecdote} from "../reducers/anecdoteReducer";
import {hideNotification, showNotification} from "../reducers/notificationReducer";
import AnecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    const anecdote = {
      content: anecdoteContent,
      votes: 0
    }
    const request = await AnecdoteService.addAnecdote(anecdote)
    dispatch(addNewAnecdote(request))
    dispatch(showNotification(`You added ${request.content}`))
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