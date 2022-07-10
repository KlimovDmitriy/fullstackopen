import {createSlice} from "@reduxjs/toolkit";

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
    }
  }
})

export const {vote, addNewAnecdote, setAnecdoteList} = anecdoteSlice.actions
export default anecdoteSlice.reducer