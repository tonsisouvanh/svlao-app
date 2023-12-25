import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

const initialState = {
  users: [],
  listStatus: "idle" | "loading" | "succeeded" | "failed",
  createStatus: "idle" | "loading" | "succeeded" | "failed",
  updateStatus: "idle" | "loading" | "succeeded" | "failed",
  removeStatus: "idle" | "loading" | "succeeded" | "failed",
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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/${userData._id}`,
        {
          ...userData,
          university: {
            ...userData.university,
            universityId: userData.university.universityId?._id,
          },
        },
        config,
      );
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

const resetStatus = (state) => {
  state.listStatus = "idle";
  state.createStatus = "idle";
  state.updateStatus = "idle";
  state.removeStatus = "idle";
  state.error = "";
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: resetStatus,
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state) => {
        state.listStatus = "loading";
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.users = action.payload.users;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.error = null;
      })
      .addCase(listUsers.rejected, (state, action) => {
        console.log("signin.reject", action.payload);
        state.listStatus = "failed";
        state.user = null;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const updatedUserIndex = state.users.findIndex(
          (user) => user._id === action.payload._id,
        );
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { reset: userReset } = userSlice.actions;
export default userSlice.reducer;
