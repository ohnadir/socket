import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./slice/authSlice";
import { authApiSlice } from "./slice/anotherAuthSlice";

export const store = configureStore({
    reducer: {
        // auth: authReducers,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
    },
    middleware: (getDefaultMiddlewares)=>{
        return getDefaultMiddlewares().concat(authApiSlice.middleware)
    }
})