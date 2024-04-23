import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/utils";
import { apiRequest, apiRequestPrivate } from "../../utils/axiosConfig";

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

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await apiRequestPrivate.get(`/users/${userId}`, config);
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
