import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'upstoxChart/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5005/api/upstox/historical-data/`, {
        method: 'GET', // Use GET method
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Read error details
        throw new Error(`Server Error: ${errorDetails}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHistoricalData = createAsyncThunk(
  'upstoxChart/fetchHistoricalData',
  async ({instrument_key}, { rejectWithValue }) => {
    try {
      console.log(instrument_key,"IK")
      const response = await fetch(`http://localhost:5005/api/upstox/historical-data/${instrument_key}`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Server Error: ${errorDetails}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create slice
const upstoxChartSlice = createSlice({
  name: 'upstoxChart',
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
      })
      .addCase(fetchHistoricalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default upstoxChartSlice.reducer;

