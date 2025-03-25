import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Services/api';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/products/${productId}/reviews`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch reviews'
      );
    }
  }
);

export const submitReview = createAsyncThunk(
  'reviews/submitReview',
  async ({ productId, rating, text }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post(
        `${API_URL}/products/${productId}/reviews`,
        { rating, text },
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to submit review'
      );
    }
  }
);

const initialState = {
  reviews: [],
  loading: false,
  reviewLoading: false,
  error: null,
  success: false,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.loading = false;
      state.error = null;
    },
    resetReviewStatus: (state) => {
      state.success = false;
      state.error = null;
      state.reviewLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Submit review
      .addCase(submitReview.pending, (state) => {
        state.reviewLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.success = true;

        if (Array.isArray(action.payload)) {
          state.reviews = action.payload;
        } else {
          state.reviews.unshift(action.payload);
        }
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviews, resetReviewStatus } = reviewsSlice.actions;

export default reviewsSlice.reducer;