// src/redux/slices/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching products

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development"
    ? `http://localhost:5000`
    : `https://e-commerse-2jqj.onrender.com`);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Products slice
export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
