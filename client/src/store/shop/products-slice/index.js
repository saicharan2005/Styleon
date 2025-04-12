import ProductFilter from "@/components/shopping-view/filter";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(
      `http://localhost:5001/api/shop/products/get?${query}`
    );
    return result?.data;
  }
);

export const fetchProductsDetails = createAsyncThunk(
  "/products/fetchProductsDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5001/api/shop/products/get/${id}`
    );
    return result?.data;
  }
);

const shoppingProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductsDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsDetails.fulfilled, (state, action) => {
        // console.log(action.payload.data);
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductsDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shoppingProductsSlice.reducer;
