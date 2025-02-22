import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5001/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ); 
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5001/api/admin/products/get"
    );
    return result?.data;
  }
);


export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5001/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5001/api/admin/products/delete/${id}`,
      
    );
    return result?.data;
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload.data);

        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        

        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductsSlice.reducer;
