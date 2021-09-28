import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://jsonplaceholder.typicode.com'
const createRequest = (url) => ({ url });

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => createRequest(`/users`)
        }),
        getUser: builder.query({
            query: (id) => createRequest(`/users/${id}`)
        })
    })
});

export const {
    useGetUsersQuery,
    useGetUserQuery
} = usersApi;