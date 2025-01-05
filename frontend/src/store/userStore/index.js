import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    newusers: null,
}


const baseUrl = "https://internship-project-phwe.onrender.com/api/user";
// const baseUrl = "http://localhost:5000/api/user";


const getUser = createAsyncThunk("/getuser", async () => {

    const response = await axios.get(`${baseUrl}/all-user`, {})

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

    const response = await axios.post(`${baseUrl}/delete-friend`, data, { withCredentials: true })

    return response.data;
})




const getFriends = createAsyncThunk("/get-friends", async (data) => {

    const response = await axios.post(`${baseUrl}/get-friends`, data, { withCredentials: true })

    return response.data;

})

const getRequest = createAsyncThunk("/get-request", async (data) => {

    const response = await axios.post(`${baseUrl}/get-request`, data, { withCredentials: true })

    return response.data;

})




const newuserSlice = createSlice({
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
                state.newusers = action.payload.users;
            })
            .addCase(getUser.rejected, (state) => {
                state.isLoading = false;
                state.newusers = null;
            })
            .addCase(sendRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newusers = action.payload.users;
            })
            .addCase(sendRequest.rejected, (state) => {
                state.isLoading = false;
                state.newusers = null;
            })
            .addCase(requestResponse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(requestResponse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newusers = action.payload.users;
            })
            .addCase(requestResponse.rejected, (state) => {
                state.isLoading = false;
                state.newusers = null;
            })
            .addCase(removeFriend.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFriend.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newusers = action.payload.users;
            })
            .addCase(removeFriend.rejected, (state) => {
                state.isLoading = false;
                state.newusers = null;
            })
            .addCase(getFriends.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newusers = action.payload.users;
            })
            .addCase(getFriends.rejected, (state) => {
                state.isLoading = false;
                state.newusers = null;
            })
            .addCase(getRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newusers = action.payload.users;
            })
            .addCase(getRequest.rejected, (state) => {
                state.isLoading = false;
                state.newusers = null;
            })
    }

})




export default newuserSlice.reducer;

export { getUser, sendRequest, requestResponse, removeFriend, getFriends, getRequest };