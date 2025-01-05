import authReducer from './authStore/index.js'
import userReducer from './userStore/index.js'
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({

    reducer : {
        auth : authReducer,
        user : userReducer,
    }
})


export default store;