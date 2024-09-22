import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; 

// Helper function to set token in localStorage
const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Helper function to remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('token');
};

// Helper function to check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
};

export const login = createAsyncThunk(
  'login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5005/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      setToken(data.token); // Save token to localStorage
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  'signup',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5005/api/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Signup failed');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  'checkAuth',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }
    if (isTokenExpired(token)) {
      removeToken();
      return rejectWithValue('Token expired');
    }
    // You might want to validate the token with your backend here
    return jwtDecode(token);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: '',
    isAuthenticated: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeToken();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
