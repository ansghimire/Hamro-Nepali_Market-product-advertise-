import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const AttribApi = createApi({
  reducerPath: "AttributeApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  tagTypes: ['Attribute'],

  endpoints: (builder) => ({
    getAttribute: builder.query({
      query: (access) => {
        return {
          headers: {
            'Authorization': `Bearer ${access}`
          },
          url: `product-attribute/`,
          method: 'GET'
        }
      },
      providesTags: ['Attribute']
    }),
    createAttribute: builder.mutation({
      query: (body) => {
        const { access, ...rest } = body
        console.log(access, '', rest)
        return {
          headers: {
            'Authorization': `Bearer ${access}`
          },
          url: `product-attribute/`,
          body: rest,
          method: 'POST'
        }
      },
      invalidatesTags: ['Attribute']
    }),
    deleteAttribute: builder.mutation({
      query: (data) => {
        const { id, access } = data
        return {
          headers: {
            'Authorization': `Bearer ${access}`
          },
          url: `product-attribute/${id}`,
          method: 'Delete'
        }
      },
      invalidatesTags: ['Attribute']
    }),
    editAttribute: builder.mutation({
      query: (body) => {
        const { id,access,  ...data } = body;
        return {
          headers: {
            'Authorization': `Bearer ${access}`
          },
          url: `product-attribute/${id}/`,
          method: "PUT",
          body: data
        }
      },
      invalidatesTags: ['Attribute']
    }),
    getAttributeValue: builder.query({
      query: (access) => {
        
        return {
          headers: {
            'Authorization': `Bearer ${access}`
          }, 
          url: `product-attribute-value/`,
          method: 'GET'
        }
      },
      providesTags: ['Attribute']
    }),
    getAttributeValueDetails: builder.query({
      query: (data) => {
        const [id, access] = data;
        return {
          headers: {
            'Authorization': `Bearer ${access}`
          },
          url: `product-attribute-value/${id}/`,
          method: 'GET'
        }
      }
    }),
    deleteAttributeValue: builder.mutation({
      query: (data) => {
        const { id, access } = data
        return {
          headers: {
            'Authorization': `Bearer ${access}`
          },
          url: `product-attribute-value/${id}`,
          method: "Delete"
        }
      },
      invalidatesTags: ['Attribute']
    }),

    createAttributeValue: builder.mutation({
      query: (data) => {
        const { access, ...rest } = data
        return {
          headers: {
            'Authorization': `Bearer ${access}`
          },
          url: `product-attribute-value/`,
          method: "POST",
          body: rest
        }
      },
      invalidatesTags: ['Attribute']
    }),
    editAttributeValue: builder.mutation({
      query: (body) => {
        const { id, access, ...data } = body;
        return {
          headers: {
            'Authorization': `Bearer ${access}`
          },
          url: `product-attribute-value/${id}/`,
          method: "PUT",
          body: data
        }
      },
      invalidatesTags: ['Attribute']
    }),


  })
})


export const { useGetAttributeQuery, useCreateAttributeMutation,
  useDeleteAttributeMutation, useEditAttributeMutation, useGetAttributeValueQuery, useGetAttributeValueDetailsQuery,
  useDeleteAttributeValueMutation, useCreateAttributeValueMutation, useEditAttributeValueMutation } = AttribApi;

