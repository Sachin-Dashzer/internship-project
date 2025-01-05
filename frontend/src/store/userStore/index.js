import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    users: null,
}


const baseUrl = "http://localhost:5000/api/user";


const getUser = createAsyncThunk("/getuser", async () => {

    const response = await axios.get(`${baseUrl}/all-user` , {})

    return response.data;
})




const sendRequest = createAsyncThunk("/send-request", async (data) => {

    const response = await axios.post(`${baseUrl}/send-request`, data, {
        withCredentials: true,
    });

    return response.data;
})



const requestResponse = createAsyncThunk("/request-response", async (data) => {

    const response = await axios.post(`${baseUrl}/request-response`, data, {
        withCredentials: true,
    });

    return response.data;
})


const removeFriend = createAsyncThunk("/delete-friend", async (data) => {

    const response = await axios.post(`${baseUrl}/delete-friend`, data)

    return response.data;
})




const getFriends = createAsyncThunk("/get-friends", async (data) => {

    const response = await axios.post(`${baseUrl}/get-friends`, data)

    return response.data;

})

const getRequest = createAsyncThunk("/get-request", async (data) => {

    const response = await axios.post(`${baseUrl}/get-request`, data)

    return response.data;

})




const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
            })
            .addCase(getUser.rejected, (state) => {
                state.isLoading = false;
                state.users = null;
            })
            .addCase(sendRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
            })
            .addCase(sendRequest.rejected, (state) => {
                state.isLoading = false;
                state.users = null;
            })
            .addCase(requestResponse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(requestResponse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
            })
            .addCase(requestResponse.rejected, (state) => {
                state.isLoading = false;
                state.users = null;
            })
            .addCase(removeFriend.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFriend.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
            })
            .addCase(removeFriend.rejected, (state) => {
                state.isLoading = false;
                state.users = null;
            })
            .addCase(getFriends.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
            })
            .addCase(getFriends.rejected, (state) => {
                state.isLoading = false;
                state.users = null;
            })
            .addCase(getRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
            })
            .addCase(getRequest.rejected, (state) => {
                state.isLoading = false;
                state.users = null;
            })
    }

})




export default userSlice.reducer;

export { getUser, sendRequest, requestResponse, removeFriend, getFriends , getRequest};