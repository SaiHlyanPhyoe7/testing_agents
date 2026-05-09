import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginRequest } from '../../services/api/authService.js'

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const result = await loginRequest({ username, password })
      return result
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed')
    }
  }
)

const initialState = {
  isAuthenticated: false,
  username: null,
  status: 'idle',
  error: null,
  isRestored: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.username = null
      state.status = 'idle'
      state.error = null
      state.isRestored = true
    },
    restoreSession(state, action) {
      state.isAuthenticated = action.payload?.isAuthenticated || false
      state.username = action.payload?.username || null
      state.status = action.payload?.isAuthenticated ? 'succeeded' : 'idle'
      state.error = null
      state.isRestored = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.username = action.payload.username
        state.error = null
        state.isRestored = true
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Invalid credentials'
        state.isAuthenticated = false
        state.username = null
        state.isRestored = true
      })
  },
})

export const { logout, restoreSession } = authSlice.actions
export default authSlice.reducer
