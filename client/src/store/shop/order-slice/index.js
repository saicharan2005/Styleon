import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvedUrl: null,
  isLoading: false,
  orderId: null,
};

export const createOrder = createAsyncThunk(
  "/order/createOrder",
  async (orderData) => {
    const result = await axios.post(
      `http://localhost:5001/api/shop/order/create`,
      orderData
    );
    console.log("🧾 Backend response:", result.data); 
    return result?.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ stripeSessionId, orderId }) => {
    const result = await axios.post(
      `http://localhost:5001/api/shop/order/capture`,
      { stripeSessionId , orderId }
    );
    console.log("🧾 Backend response:", result.data);
    return result?.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvedUrl = action.payload.approvedUrl;
          state.orderId = action.payload.orderId;
          sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));
            console.log("✅ Payload inside slice:", action.payload);
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvedUrl = null;
        state.orderId = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
