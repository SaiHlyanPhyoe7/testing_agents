import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProductList } from '../../services/api/dataService.js'

export const loadProducts = createAsyncThunk(
  'data/loadProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProductList()
      return products
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load products')
    }
  }
)

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetData(state) {
      state.items = []
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Unable to load data'
      })
  },
})

export const { resetData } = dataSlice.actions
export default dataSlice.reducer
