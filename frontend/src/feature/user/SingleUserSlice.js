import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { formatDate } from "../../utils/utils";
axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_API_PORT}`;

const initialState = {
  singleUser: localStorage.getItem("singleUserInfo")
    ? JSON.parse(localStorage.getItem("singleUserInfo") || "")
    : null,
  status: "idle" | "loading" | "succeeded" | "failed",
  createStatus: "idle" | "loading" | "succeeded" | "failed",
  updateStatus: "idle" | "loading" | "succeeded" | "failed",
  removeStatus: "idle" | "loading" | "succeeded" | "failed",
  error: "",
};

// Login user
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.get(`/api/users/${userId}`, config);
      const formattedData = {
        ...data,
        visa: {
          from: formatDate(data.visa.from),
          to: formatDate(data.visa.to),
        },
        dob: formatDate(data.dob),
        passport: {
          ...data.passport,
          expired: formatDate(data.passport.expired),
        },
      };
      // localStorage.setItem("singleUserInfo", JSON.stringify(formattedData));

      return formattedData;
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
  state.status = "idle";
  state.createStatus = "idle";
  state.updateStatus = "idle";
  state.removeStatus = "idle";
  state.error = "";
};

const singleUserSlice = createSlice({
  name: "singleUser",
  initialState,
  reducers: {
    reset: resetStatus,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleUser = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { reset: singleUserReset } = singleUserSlice.actions;
export default singleUserSlice.reducer;
