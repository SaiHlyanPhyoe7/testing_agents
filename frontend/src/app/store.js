import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import dataReducer from '../features/data/dataSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
  },
})
