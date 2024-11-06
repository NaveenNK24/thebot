import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'chart/fetchData',
  async ({ symbol, smaPeriod }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5005/api/binance/historical-data/${symbol}?smaPeriod=${smaPeriod}`, {
        method: 'GET', // Use GET method
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Read error details
        throw new Error(`Server Error: ${errorDetails}`);
      }

      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Create slice
const chartSlice = createSlice({
  name: 'chart',
  initialState: {
      loading: false,
      data: [],
      error: null,
    },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chartSlice.reducer;

