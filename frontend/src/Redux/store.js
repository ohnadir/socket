import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./slice/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducers,
    }
})