import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProductList, fetchCategories } from '../../services/api/dataService.js'

export const loadProducts = createAsyncThunk(
  'data/loadProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProductList(10, 0)
      return products
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load products')
    }
  }
)

export const loadMoreProducts = createAsyncThunk(
  'data/loadMoreProducts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = getState()
      const skip = data.allItems.length
      const products = await fetchProductList(10, skip)
      return products
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load more products')
    }
  }
)

export const loadCategories = createAsyncThunk(
  'data/loadCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await fetchCategories()
      return categories
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load categories')
    }
  }
)

const initialState = {
  allItems: [],
  filteredItems: [],
  categories: [],
  searchTerm: '',
  selectedCategory: '',
  status: 'idle',
  error: null,
  hasMore: true,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
      state.filteredItems = state.allItems.filter(item =>
        item.title.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
        (state.selectedCategory === '' || item.category === state.selectedCategory)
      )
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload
      state.filteredItems = state.allItems.filter(item =>
        item.title.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
        (state.selectedCategory === '' || item.category === state.selectedCategory)
      )
    },
    resetData(state) {
      state.allItems = []
      state.filteredItems = []
      state.categories = []
      state.searchTerm = ''
      state.selectedCategory = ''
      state.status = 'idle'
      state.error = null
      state.hasMore = true
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
        state.allItems = action.payload
        state.filteredItems = action.payload
        state.hasMore = action.payload.length === 10
        state.error = null
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Unable to load data'
      })
      .addCase(loadMoreProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadMoreProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.allItems = [...state.allItems, ...action.payload]
        state.filteredItems = [...state.allItems, ...action.payload].filter(item =>
          item.title.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
          (state.selectedCategory === '' || item.category === state.selectedCategory)
        )
        state.hasMore = action.payload.length === 10
      })
      .addCase(loadMoreProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Unable to load more data'
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

export const { setSearchTerm, setSelectedCategory, resetData } = dataSlice.actions
export default dataSlice.reducer
