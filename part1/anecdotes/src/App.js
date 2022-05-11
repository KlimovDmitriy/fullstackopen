import { useState } from 'react'

const AnecdoteOfTheDay = (props) => {
  function getAnecdote() {
    return () => props.setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }
  function vote() {
      let votesCopy = [...props.votes]
      votesCopy[props.selected] += 1
      return () => props.setVotes(votesCopy)
  }
  return <><h2>Anecdote of the day</h2>
    <p>{props.anecdotes[props.selected]}</p>
    <p>Anecdote has {props.votes[props.selected]} votes</p>
    <Button text="Vote" handleClick={vote()}/>
    <Button text="Next anecdote" handleClick={getAnecdote()} />
  </>
}

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const BestAnecdote = (props) => {
  console.log(props.votes)
  const anecdoteIndex = []

  props.votes.forEach((el, index) => {
    if (el === Math.max(...props.votes)) {
      anecdoteIndex.push(index)
    }
    return true
  })

  const bestAnecdoteIndex = anecdoteIndex[Math.floor(Math.random() * anecdoteIndex.length)]

  return <>
    <h2>Anecdote with most votes</h2>
    <p>{props.anecdotes[bestAnecdoteIndex]}</p>
  </>
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))



  return (
    <div>
      <AnecdoteOfTheDay anecdotes={anecdotes} votes={votes} setSelected={setSelected} selected={selected} setVotes={setVotes} />
      <BestAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App