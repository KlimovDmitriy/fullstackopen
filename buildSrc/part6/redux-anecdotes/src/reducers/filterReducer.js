import {createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilterValue(state, action) {
      state = action.payload
      return state
    }
  }
})

export const {setFilterValue} = filterSlice.actions
export default filterSlice.reducer