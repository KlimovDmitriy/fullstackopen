import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes/'

const getAnecdotes = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const addAnecdote = async (anecdote) => {
  const request = await axios.post(baseUrl, anecdote)
  return request.data
}

const voteAnecdote = async (anecdote) => {
  const request = await axios.put(baseUrl + anecdote.id, anecdote)
  return request.data
}
const AnecdoteService = {getAnecdotes, addAnecdote, voteAnecdote}
export default AnecdoteService