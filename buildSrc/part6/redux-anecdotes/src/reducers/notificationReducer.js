import {createSlice} from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state = action.payload
      return state
    },
    hideNotification(state, action) {
      state = ''
      return state
    }
  }
})

export const {showNotification, hideNotification} = notificationSlice.actions
export default notificationSlice.reducer