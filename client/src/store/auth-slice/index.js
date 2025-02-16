import { registerUser } from "@/pages/auth/register";
import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    isAuthenicated: false,
    isloading: false,
    user:null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isloading = true;
          })
          .addCase(registerUser.fulfilled, (state) => {
            state.isloading = false;
            state.user = null;
            state.isAuthenicated = false;
          })
          .addCase(registerUser.rejected, (state) => {
            state.isloading = false;
            state.user = null;
            state.isAuthenicated = false;
          });
    }


})

export const { setUser } = authSlice.actions
export default authSlice.reducer