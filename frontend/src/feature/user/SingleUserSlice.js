import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { formatDate } from "../../utils/utils";
axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_API_PORT}`;

const initialState = {
  singleUser: localStorage.getItem("singleUserInfo")
    ? JSON.parse(localStorage.getItem("singleUserInfo") || "")
    : null,
  status: {
    fetchAll: "idle" | "loading" | "succeeded" | "failed",
    fetchOne: "idle" | "loading" | "succeeded" | "failed",
    create: "idle" | "loading" | "succeeded" | "failed",
    update: "idle" | "loading" | "succeeded" | "failed",
    remove: "idle" | "loading" | "succeeded" | "failed",
  },
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
  state.error = null;
  state.status = {
    fetchAll: "idle",
    fetchOne: "idle",
    create: "idle",
    update: "idle",
    remove: "idle",
  };
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
        state.status.fetchOne = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status.fetchOne = "succeeded";
        state.singleUser = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status.fetchOne = "failed";
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { reset: singleUserReset } = singleUserSlice.actions;
export default singleUserSlice.reducer;
