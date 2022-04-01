import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const loginApi = createApi({
    reducerPath : "loginApi",
    baseQuery : fetchBaseQuery({baseUrl:'http://127.0.0.1:8000/auth/'}),
    tagTypes : ['Login'],

    endpoints : (builder) => ({
        createLogin : builder.mutation({
            query: (body) => {
                console.log(body)
                return {
                    url : 'jwt/create/',
                    body : body,
                    method: 'POST',
                    credentials: "include"
                }
            },
            invalidateTags: ['Login']
        }),

        createNewToken : builder.mutation({
            query: () => {
                return {
                    url : 'jwt/refresh/',
                    method: 'post',
                    credentials: "include"  
                }
            },
            invalidateTags: ['Login']
        })

    })

})

export const { useCreateLoginMutation, useCreateNewTokenMutation }  = loginApi
