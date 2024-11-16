import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
      setNotif(state, action) {
          return action.payload
      }
  }
})

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(setNotif(content))
    setTimeout(() => {
      dispatch(setNotif(''))
    }, time*1000)
  }
}

export const { setNotif } = notificationSlice.actions
export default notificationSlice.reducer
