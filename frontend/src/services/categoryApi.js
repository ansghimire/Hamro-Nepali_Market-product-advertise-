import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
    tagTypes: ['Category'],
  

    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => {
                return {
                    headers : {
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                        
                      },
                    url: 'category/'
                }
            },
            providesTags: ['Category']
        }),
        deleteCategory: builder.mutation({
            query: (data) => {
                // console.log(id);
                const {id, access} = data
                return {
                    headers: {
                        'Authorization': `Bearer ${access}`
                    },
                    url: `category/${id}`,
                    method: 'Delete'
                }
            },
            invalidatesTags: ['Category']
        }),
        createCategory: builder.mutation({
            query: (body) => {
                const { access, ...rest } = body
                console.log(access, '', rest)
                return {
                    headers: {
                        'Authorization': `Bearer ${access}`
                    },

                    url: 'category/',
                    body: rest,
                    method: 'POST'
                }
            },
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation({
            query: (updateCategory) => {
                // console.log(updateCategory);
                const { id, access,  ...data } = updateCategory;
                return {
                    headers : {
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${access}`
                      },
                    url: `category/${id}/`,
                    body: data,
                    method: 'PUT'
                }
            },
            invalidatesTags: ['Category']
        })
    })

})


export const { useGetCategoryQuery, useDeleteCategoryMutation,
    useCreateCategoryMutation, useUpdateCategoryMutation } = categoryApi;
