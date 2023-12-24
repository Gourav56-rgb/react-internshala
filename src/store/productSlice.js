import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";

const initialState = {
    products: [],
    singleProduct: [],
    status: "idle"
}

// for getting the products list with limited numbers
export const fetchProductsAsync = createAsyncThunk('products/fetchProducts', async(limit) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`);
    const data = await response.json();
    return data.products;
});

// getting the single product data
export const fetchSingleProductAsync = createAsyncThunk('product-single/fetchSingleProduct', async(id) => {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProductsAsync.pending, (state) => {
            state.status = "loading";
        })

        .addCase(fetchProductsAsync.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = "idle";
        })
        
        .addCase(fetchProductsAsync.rejected, (state) => {
            state.status = "failed"
        })

        .addCase(fetchSingleProductAsync.pending, (state) => {
            state.status = "loading";
        })

        .addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            state.status = "idle";
        })

        .addCase(fetchSingleProductAsync.rejected, (state) => {
            state.status = "failed";
        })
    }
});

export const getAllProducts = (state) => state.product.products;
export const getSingleProduct = (state) => state.product.singleProduct;
export const getSingleProductStatus = (state) => state.product.status;
export default productSlice.reducer;