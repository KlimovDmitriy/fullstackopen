import {useDispatch, useSelector} from 'react-redux'
import {updateAnecdote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  let anecdotes = [...useSelector(state => state.anecdotes)]
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  if(filter) {
    anecdotes = anecdotes.filter(element => element.content.toLowerCase().includes(filter.toLowerCase()))
  }
  const voteAnecdote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`You voted for ${anecdote.content}`, 5))}
  return (
    <>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList