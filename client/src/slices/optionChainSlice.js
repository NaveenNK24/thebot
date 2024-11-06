import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch option chain data
export const fetchOptionChain = createAsyncThunk(
  'optionChain/fetchOptionChain',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5005/api/upstox/option-chain',{
        params: {
          instrument_key: 'NSE_INDEX|Nifty 50',
          expiry_date: '2024-11-07',
          token: localStorage.getItem('upstoxToken'),
        },
      });
      // console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching option chain:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const optionChainSlice = createSlice({
  name: 'optionChain',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOptionChain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOptionChain.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('Option chain data stored in Redux:', action.payload);
      })
      .addCase(fetchOptionChain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
        console.error('Error in Redux slice:', action.payload);
      });
  },
});

export default optionChainSlice.reducer;
