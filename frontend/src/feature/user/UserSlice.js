import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

const initialState = {
  users: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: "",
  page: 1,
  pages: 0,
};

// Login user
export const listUsers = createAsyncThunk(
  "user/listUsers",
  async ({ pageNumber, keyword = "" }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      // const { data } = await axios.get(
      //   keyword || keyword === ""
      //     ? `/api/users?keyword=${keyword}&pageNumber=${pageNumber}`
      //     : `/api/users?keyword=${keyword}&pageNumber=${pageNumber}`,
      //   config,
      // );

      const { data } = await axios.get(
        `/api/users?keyword=${keyword}&pageNumber=${pageNumber}`,
        config,
      );
      console.log("🚀 ~ file: UserSlice.js:36 ~ data:", data)

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.users;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.error = null;
      })
      .addCase(listUsers.rejected, (state, action) => {
        console.log("signin.reject", action.payload);
        state.status = "failed";
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
