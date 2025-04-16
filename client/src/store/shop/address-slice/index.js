import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {      
    isLoading: false,
    addressList: [],

};

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5001/api/shop/address/add",
      formData
    );
    return response?.data;
  }
);


export const fetchAllAddress = createAsyncThunk(
  "address/fetchAllAddress",
  async ({userId}) => {
    const response = await axios.get(
      `http://localhost:5001/api/shop/address/get/${userId}`
      
    );
    return response?.data;
  }
);



export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({userId,addessId,formData}) => {
    const response = await axios.put(
      `http://localhost:5001/api/shop/address/update/${userId}/${addessId}`,
      formData
    );
    return response?.data;
  }
);


export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId}) => {
    const response = await axios.delete(
      `http://localhost:5001/api/shop/address/delete/${userId}/${addressId}`,

    );
    return response?.data;
  }
);
    
const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {   
        builder.addCase(addAddress.pending, (state) => {    
            state.isLoading = true;
        }
        )
        .addCase(addAddress.fulfilled, (state) => {
            state.isLoading = false;

        })
        .addCase(addAddress.rejected, (state) => {
            state.isLoading = false;

        })
        .addCase(fetchAllAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchAllAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;
        })
        .addCase(fetchAllAddress.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        })
        .addCase(editAddress.pending, (state) => {
            state.isLoading = true;
        })      
        .addCase(editAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;
        })
        .addCase(editAddress.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        })
        .addCase(deleteAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;
        })
        .addCase(deleteAddress.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        });
        
    }
  
});

export default addressSlice.reducer;

