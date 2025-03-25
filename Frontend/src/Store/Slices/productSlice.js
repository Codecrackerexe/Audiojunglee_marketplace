import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api";

const token = localStorage.getItem('token');

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, search, minPrice, maxPrice }, { rejectwithValue }) => {
    try {
      let url = '/products/';
      const params = {};

      if (category) params.category = category;
      if (search) params.search = search;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const response = await api.get(url, { params });
      return response.data;
    }
    catch (error) {
      return rejectwithValue(error.response.data);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post('/products/', productData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const uploadAudioFile = createAsyncThunk(
  'products/uploadAudioFile',
  async (fileData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('audio_file', fileData);
      const response = await api.post('/products/upload-audio/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  audioFile: null,
  uploadLoading: false,
  uploadError: null,
  pagination: {
    count: 0,
    next: null,
    previous: null
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.product = null;
    },
    clearAudioFile: (state) => {
      state.audioFile = null;
      state.uploadError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.results;
        state.pagination = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch product details';
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...state.products, action.payload];
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create product';
      })
      .addCase(uploadAudioFile.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
      })
      .addCase(uploadAudioFile.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.audioFile = action.payload;
      })
      .addCase(uploadAudioFile.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload || 'Failed to upload audio file';
      });
  }
});

export const { clearProductDetails, clearAudioFile } = productSlice.actions;
export default productSlice.reducer;
