import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../service/authService";

// register function 
export const register = createAsyncThunk("auth/register",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await authService.register(email, password);
            return { user: data };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });


// login function
export const login = createAsyncThunk("auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await authService.login(email, password);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

// login function
export const loadUser = createAsyncThunk("auth/loadUser",
    async (token, { rejectWithValue }) => {
        try {
            const data = await authService.loadUser(token);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });


const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload || 'Login failed';
        })
        .addCase(register.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload || 'Login failed';
        })
        .addCase(loadUser.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loadUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(loadUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload || 'Login failed';
        });
    }
});
  
const { reducer } = authSlice;
export default reducer;