import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api";

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async ({ rejectwithValue }) => {
    try {
      const response = await api.get('/categories/');
      return response.data;
    } catch (error) {
      return rejectwithValue(error.response.data);
    }

  }
);

export const fetchCategoryTree = createAsyncThunk(
  'categories/fetchCategoryTree',
  async ({ rejectwithValue }) => {
    try {
      const response = await api.get('/categories/tree');
      return response.data;
    } catch (error) {
      return rejectwithValue(error.response.data);
    }
  }

);

const initialState = {
  Categories: [],
  catgegoryTree: [],
  loading: false,
  error: null
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch categories';
      })
      .addCase(fetchCategoryTree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryTree.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryTree = action.payload;
      })
      .addCase(fetchCategoryTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch category tree';
      });
  }
});

export default categorySlice.reducer;
