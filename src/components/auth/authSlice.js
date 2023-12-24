import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/apiURL";

const initialState = {
  loggedInUser: null,
  error: null,
  status: "idle",
};

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (username, password) => {
    const response = await fetch(`${BASE_URL}auth/login` + username, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "",
        password: "",
      }),
    });
    const data = await response.json();
    return data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const selectLoggedInUser = (state) => state.user.loggedInUser;
export default authSlice.reducer;
