import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const login = createAsyncThunk('upstoxAuth/login', async (credentials) => {
  const response = await axios.post('/api/upstox/token', credentials);
  return response.data;
});

// Auth slice
const upstoxAuthSlice = createSlice({
  name: 'upstoxAuth',
  initialState: {
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token'),
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.token = '';
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = upstoxAuthSlice.actions;
export default upstoxAuthSlice.reducer;
