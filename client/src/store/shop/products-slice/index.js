import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  isLoading: false,
  productList: [],
};


export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5001/api/shop/products/get"
    );
    return result?.data;
  }
);

const shoppingProductsSlice = createSlice({
    
name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(fetchAllFilteredProducts.pending, (state) => {
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
          });
      
    }
  

})

export  default shoppingProductsSlice.reducer