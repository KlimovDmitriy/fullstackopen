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

const {showNotification, hideNotification} = notificationSlice.actions
export const setNotification = (notification, seconds) => {
  return dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => dispatch(hideNotification()), seconds * 1000)
  }
}
export default notificationSlice.reducer