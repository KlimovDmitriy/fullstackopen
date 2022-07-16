import {createSlice} from "@reduxjs/toolkit";
import AnecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const anecdote = state.find(a => a.id === action.payload)
      anecdote.votes++
      state.filter(anecdote => anecdote.id !== action.payload).concat(anecdote)
    },
    addNewAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdoteList(state, action) {
      return action.payload
    },
    updateAnecdotes(state, action) {
      return state.filter(anecdote => anecdote.id !== action.payload.id).concat(action.payload)
    }
  }
})

export const {vote, addNewAnecdote, setAnecdoteList, updateAnecdotes} = anecdoteSlice.actions

export const initializeAnedotes = () => {
  return async dispatch => {
    const anecdotes = await AnecdoteService.getAnecdotes();
    dispatch(setAnecdoteList(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await AnecdoteService.addAnecdote(anecdote)
    dispatch(addNewAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {...anecdote, votes: anecdote.votes+1}
    const updatedAnecdote = await AnecdoteService.voteAnecdote(newAnecdote)
    dispatch(updateAnecdotes(updatedAnecdote))
  }
}
export default anecdoteSlice.reducer