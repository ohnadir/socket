import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../service/authService";
import Cookies from 'js-cookie';

export const authApiSlice = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: "/register",
                method: "POST",
                body: credentials
            })
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        }),
        loadUser: builder.query({
            query: (token) => ({
                url : `/me/${token}`,
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cookie': Cookies.get('cookieName')
                },
                withCredentials : true
            })
        })
    })
});

export const { useRegisterMutation, useLoginMutation, useLoadUserQuery } = authApiSlice;