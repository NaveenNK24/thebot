import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkConnectionStatus = createAsyncThunk(
  'upstox/checkConnectionStatus',
  async () => {
    const response = await axios.get('http://localhost:5005/api/upstox/get-connection-status');
    return response.data;
  }
);

export const connectUpstox = createAsyncThunk(
  'upstox/connect',
  async ({ connectionName, apiKey, apiSecret }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5005/api/upstox/upstox-connect', {
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

export const disconnectUpstox = createAsyncThunk(
  'upstox/disconnect',
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete('http://localhost:5005/api/upstox/upstox-disconnect');
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
        state.connectionName = action.payload.connectionName;

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
      })
      .addCase(disconnectUpstox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(disconnectUpstox.fulfilled, (state) => {
        state.isConnected = false;
        state.connectionName = '';
        state.loading = false;
      })
      .addCase(disconnectUpstox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { reducer: upstoxReducer } = upstoxSlice;



export default upstoxSlice.reducer;