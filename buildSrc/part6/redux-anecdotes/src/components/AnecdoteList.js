import {useSelector,useDispatch} from 'react-redux'
import {filterAnecdote, vote} from "../reducers/anecdoteReducer";
import {hideNotification, showNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  let anecdotes = [...useSelector(state => state.anecdotes)]
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  if(filter) {
    anecdotes = anecdotes.filter(element => element.content.toLowerCase().includes(filter.toLowerCase()))
  }
  const voteAnecdote = ({content, id}) => {
    dispatch(vote(id))
    dispatch(showNotification(`You voted for ${content}`))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }
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