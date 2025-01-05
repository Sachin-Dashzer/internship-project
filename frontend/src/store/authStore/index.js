import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isloading: true,
    user: null,
    isAuthenticated: true,
};

const baseUrl = "https://internship-project-phwe.onrender.com/api";


const loginUser = createAsyncThunk("/auth/login", async (formData) => {
    const response = await axios.post(`${baseUrl}/auth/login`, formData, {
        withCredentials: true,
    });
    return response.data;
});


const registerUser = createAsyncThunk("/auth/register", async (formData) => {
    const response = await axios.post(
        `${baseUrl}/auth/register`,
        formData,
        { withCredentials: true }
    );
    return response.data;
});


const logoutUser = createAsyncThunk("/auth/logout", async () => {
    const response = await axios.post(
        `${baseUrl}/auth/logout`,
        {},
        {
            withCredentials: true,
        }
    );
    return response.data;
});





const checkAuthentication = createAsyncThunk("/auth/check-auth", async () => {
    const response = await axios.get(`${baseUrl}/auth/check-auth`, {
        withCredentials: true,
        headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
    });
    return response.data;
});


const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(registerUser.fulfilled, (state) => {
                state.isAuthenticated = true;
                state.isloading = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.isloading = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.isloading = true;
            })


            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload.success;
                state.user = action.payload.user;
                state.isloading = false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.isloading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isloading = true;
            })


            .addCase(checkAuthentication.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload.success;
                state.user = action.payload.user;
                state.isloading = false;
            })
            .addCase(checkAuthentication.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.isloading = false;
            })
            .addCase(checkAuthentication.pending, (state) => {
                state.isloading = true;
            })


            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.isloading = false;
            })


    },
});

export default authSlice.reducer;
export { loginUser, registerUser, checkAuthentication, logoutUser };