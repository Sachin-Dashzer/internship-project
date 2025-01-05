import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";





const initialState = {
    isLoading: true,
    user: null,
    isAuthenticated: false
}


const baseUrl = "http://localhost:5000/api/auth";




const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data) => {
        const response = await axios.post(`${baseUrl}/login`, data, {
            withCredentials: true,
        }
        );
        return response.data;
    }
)


const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data) => {
        const response = await axios.post(`${baseUrl}/register`, data, {
            withCredentials: true,
        }
        );
        return response.data;
    }
)



const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async () => {
        const response = await axios.post(`${baseUrl}/logout`);
        return response.data;
    }
)



const checkAuthentication = createAsyncThunk(
    "auth/checkAuthentication",
    async () => {
        const response = await axios.get(`${baseUrl}/check-auth`);
        return response.data;
    }
)

















const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(checkAuthentication.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload.success;
                state.user = action.payload.user;
                state.isLoading = false;
            })
            .addCase(checkAuthentication.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.isLoading = false;
            })
            .addCase(checkAuthentication.pending, (state) => {
                state.isLoading = true;
            })


    }
})




export default authSlice.reducer;
export { loginUser, registerUser, logoutUser, checkAuthentication };