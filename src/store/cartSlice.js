import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";

const initialState = {
  status: "idle",
  items: [],
  itemsCount: 0,
  totalAmount: 0,
  selectedProduct: null
};

export const addToCartAsync = createAsyncThunk("cart/addToCart", async (item) => {
  const response = await fetch(`${BASE_URL}carts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  return data;
});

export const getCartTotalAsync = createAsyncThunk(
  "cart/getCartTotal",
  async () => {
    const response = await fetch(`${BASE_URL}carts`);
    const data = await response.json();
    return data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
        state.selectedProduct = null
      }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading"
    })
    .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.items.push(action.payload)
    })
    .addCase(addToCartAsync.rejected, (state) => {
        state.status = "failed"
    })
    .addCase(getCartTotalAsync.pending, (state) => {
        state.status = "loading"
    })
    .addCase(getCartTotalAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.totalAmount = action.payload;
        state.itemsCount = state.items.length;
    })
    .addCase(getCartTotalAsync.rejected, (state) => {
        state.status = "failed"
    })
  }
});

export const {clearSelectedProduct} = cartSlice.actions;
export const selectItems = (state) => state.cart.items;
export const getCartItemsCount = (state) => state.cart.itemsCount;
export default cartSlice.reducer;
