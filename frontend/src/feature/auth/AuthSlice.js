import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { formatDate } from "../../utils/utils";
axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_API_PORT}`;

const initialState = {
  auth: sessionStorage.getItem("authInfo")
    ? JSON.parse(sessionStorage.getItem("authInfo") || "")
    : null,
  status: "idle" | "loading" | "succeeded" | "failed",
  error: "",
};

export const signUp = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const { emailAddress, password, fullname } = userData;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        "/api/users",
        { emailAddress, password, fullname },
        config,
      );
      return null;
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

export const signIn = createAsyncThunk(
  "auth/signin",
  async (userData, thunkAPI) => {
    try {
      const { emailAddress, password } = userData;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { emailAddress, password },
        config,
      );

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

      sessionStorage.setItem("authInfo", JSON.stringify(formattedData));
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

export const signOut = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      sessionStorage.clear();
      return null;
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

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
      return userData;
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

const statusReset = (state) => {
  state.status = "idle";
  state.error = null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: statusReset,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.auth = null;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.auth = null;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.auth = null;
        state.error = action.payload;
      })
      .addCase(signOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status = "idle";
        state.auth = null;
      });
  },
});

export const { reset: authReset } = authSlice.actions;
export default authSlice.reducer;
