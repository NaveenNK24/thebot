import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkConnectionStatus = createAsyncThunk(
  'upstox/checkConnectionStatus',
  async () => {
    const response = await axios.get('/api/upstox/connection-status');
    return response.data;
  }
);

export const connectUpstox = createAsyncThunk(
  'upstox/connect',
  async ({ connectionName, apiKey, apiSecret }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/upstox/connect', {
        connectionName,
        apiKey,
        apiSecret
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const upstoxSlice = createSlice({
  name: 'upstox',
  initialState: {
    isConnected: false,
    connectionName: '',
    error: null,
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkConnectionStatus.fulfilled, (state, action) => {
        state.isConnected = action.payload.isConnected;
        state.loading = false;
      })
      .addCase(connectUpstox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connectUpstox.fulfilled, (state, action) => {
        state.isConnected = true;
        state.connectionName = action.payload.connectionName;
        state.loading = false;
        state.error = null;
      })
      .addCase(connectUpstox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || 'An error occurred';
      });
  }
});

export default upstoxSlice.reducer;