import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import searchReducer from "./searchSlice"

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        search: searchReducer
    }
})