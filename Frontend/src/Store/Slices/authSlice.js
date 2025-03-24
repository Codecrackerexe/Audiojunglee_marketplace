import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

// Token validation function
const checkTokenValidity = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// Initial state with token validation
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: checkTokenValidity(),
  loading: false,
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register/', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get('http://localhost:8000/api/auth/profile/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;
      await axios.post('http://localhost:8000/api/auth/logout/', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return null;
    } catch (error) {
      return null;
    }
  }
);
// New refresh token function
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async ({ rejectWithValue }) => {
    try {
      const refresh = localStorage.getItem('refreshToken');
      if (!refresh) {
        return rejectWithValue('No refresh token available');
      }

      const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: refresh
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Token refresh failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        // For JWT, store both access and refresh tokens
        state.token = action.payload.access || action.payload.token;
        localStorage.setItem('token', action.payload.access || action.payload.token);
        if (action.payload.refresh) {
          localStorage.setItem('refreshToken', action.payload.refresh);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.access || action.payload.token;
        localStorage.setItem('token', action.payload.access || action.payload.token);
        if (action.payload.refresh) {
          localStorage.setItem('refreshToken', action.payload.refresh);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      })

      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.access;
        localStorage.setItem('token', action.payload.access);
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;