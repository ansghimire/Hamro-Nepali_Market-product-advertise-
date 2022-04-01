import {configureStore} from '@reduxjs/toolkit'
import {categoryApi} from '../services/categoryApi'
import { AttribApi } from '../services/AttribApi'
import { productTypeApi } from '../services/productTypeApi'
import { loginApi } from '../services/loginApi'

export  const store =  configureStore({
    reducer: {
        [categoryApi.reducerPath]: categoryApi.reducer,
        [AttribApi.reducerPath]: AttribApi.reducer,
        [productTypeApi.reducerPath] : productTypeApi.reducer,
        [loginApi.reducerPath] : loginApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware, AttribApi.middleware, productTypeApi.middleware, loginApi.middleware),

})