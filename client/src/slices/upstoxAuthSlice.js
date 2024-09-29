import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const login = createAsyncThunk('upstoxAuth/login', async (upstoxToken) => {
  console.log("login");
  const response = await axios.get('http://localhost:5005/api/upstox/auth', {
    method: 'GET',
    withCredentials: true  // Include cookies, if applicable
  });
  console.log("response", response.data);
  if (response.data.authUrl) {
    window.open(response.data.authUrl, '_blank');
  }
  
  return { ...response.data, upstoxToken };
});

export const handleUpstoxCallback = createAsyncThunk('upstoxAuth/handleUpstoxCallback', async (code) => {
  const response = await axios.get(`http://localhost:5005/api/upstox/code?code=${code}`);
  console.log("response", response.data);
  return response.data;
});

// Auth slice
const upstoxAuthSlice = createSlice({
  name: 'upstoxAuth',
  initialState: {
    upstoxToken: localStorage.getItem('upstoxToken') || '',
    isAuthenticated: !!localStorage.getItem('upstoxToken'),
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('upstoxToken');
      state.upstoxToken = '';
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.upstoxToken = action.payload.upstoxToken;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        localStorage.setItem('upstoxToken', action.payload.upstoxToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(handleUpstoxCallback.fulfilled, (state, action) => {
        // state.upstoxToken = action.payload.access_token;
        localStorage.setItem('upstoxToken', action.payload.access_token);
        console.log("upstoxToken", action.payload.access_token);
      })
      .addCase(handleUpstoxCallback.rejected, (state, action) => {
        state.error = action.error.message;
      });;
  },
});

export const { logout } = upstoxAuthSlice.actions;
export default upstoxAuthSlice.reducer;
