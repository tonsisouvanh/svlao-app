import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { formatDate } from "../../utils/utils";
axios.defaults.baseURL = "http://localhost:5000";

const initialState = {
  users: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: "",
};

// Login user
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/users/profile",
        {
          ...userData,
          university: {
            ...userData.university,
            universityId: userData.university.universityId?._id,
          },
        },
        config,
      );
      sessionStorage.setItem("authInfo", JSON.stringify(userData));
      return {};
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
      // sign up
      // .addCase(signUp.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(signUp.fulfilled, (state) => {
      //   state.status = "succeeded";
      //   // state.user = action.payload;
      //   state.error = null;
      // })
      // .addCase(signUp.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.user = null;
      //   state.error = action.payload || "An error occurred during sign-in.";
      // })
      // sign in
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        // console.log("signin.fullfil", action.payload);
        state.status = "succeeded";
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        // console.log("signin.reject", action.payload);
        state.status = "failed";
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
