import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";

const initialState = {
    categories: [],
    categoryProducts: [],
    status: "idle"
}

export const fetchCategoriesAsync = createAsyncThunk('categories/fetchCategories', async() => {
    const response = await fetch(`${BASE_URL}products/categories`);
    const data = await response.json();
    return data;
});

export const fetchProductsOfCategoryAsync = createAsyncThunk('category-products/fetchProductsOfCategory', async(category) => {
    const response = await fetch(`${BASE_URL}products/category/${category}`);
    const data = await response.json();
    return data;
});

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategoriesAsync.pending, (state) => {
            state.status = "loading";
        })

        .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.categories = action.payload;
        })

        .addCase(fetchCategoriesAsync.rejected, (state) => {
            state.status = "failed";
        })

        .addCase(fetchProductsOfCategoryAsync.pending, (state) => {
            state.status = "loading";
        })

        .addCase(fetchProductsOfCategoryAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.categoryProducts = action.payload;
        })

        .addCase(fetchProductsOfCategoryAsync.rejected, (state) => {
            state.status = "failed";
        })
    }
});

export const getAllCategories = (state) => state.category.categories;
export const getAllProductsByCategory = (state) => state.category.categoryProducts;
export const getCategoryProductsStatus = (state) => state.category.status;
export default categorySlice.reducer;