import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productTypeApi = createApi({
    reducerPath: 'productType',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/'}),
    tagTypes : ['ProductType'],
    endpoints : (builder) => ({
        createProductType : builder.mutation({
            query: (body) => {
                const {access,...data} = body
                return {
                    headers: {
                        Authorization : `Bearer ${access}`
                    },
                    url :`product-type/`,
                    body: data,
                    method : 'POST'
                }
            },
            invalidatesTags: ['ProductType']
        }),
        getProductType: builder.query({
            query : () => {
                return {
                    url: `product-type/`,
                    method : "GET"
                }
            },
            providesTags : ['ProductType']
        }),
        getDetailsProductType: builder.query({
            query : (id) => {
                return {
                    url: `product-type/${id}`,
                    method : "GET"
                }
            },
            providesTags : ['ProductType']
        }),
        deleteProductType : builder.mutation({
            query : ({id, access}) => {
                return{
                    headers: {
                        'Authorization': `Bearer ${access}`
                    },
                    url : `product-type/${id}/`,
                    method: 'DELETE' 
                }
            },
            invalidatesTags : ['ProductType']
        }),
        updateProductType : builder.mutation({
            query : ({type_id, access,  ...data}) => {
                return {
                    headers: {
                        'Authorization': `Bearer ${access}`
                    },
                    url : `product-type/${type_id}/`,
                    method: 'PUT',
                    body : data
                }
            },
            invalidatesTags : ['ProductType']
        })
    })
})

export const {useCreateProductTypeMutation, useGetProductTypeQuery, useDeleteProductTypeMutation,
     useGetDetailsProductTypeQuery, useUpdateProductTypeMutation } = productTypeApi