import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../service/authService";
import Cookies from 'js-cookie';
const data = Cookies.get('token');

export const authApiSlice = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: "/signup",
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
            query: () => ({
                url : "/me",
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${data}`
                },
                withCredentials : true
            })
        })
    })
});

export const { useRegisterMutation, useLoginMutation, useLoadUserQuery } = authApiSlice;