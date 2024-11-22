import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from './feautures/auth/authSlice'
import favoritesReducer from '../redux/feautures/favorites/favoriteSlice'
import { getFavoritesFromLocalStorage } from "../Utils/localstorage";
import cartSliceReducer from '../redux/feautures/cart/cartSlice'
import shopReducer from '../redux/feautures/shop/shopSlice.js'
const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        cart: cartSliceReducer,
        shop: shopReducer,
    },

    preloadedState: {
        favorites: initialFavorites
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

setupListeners(store.dispatch);
export default store;