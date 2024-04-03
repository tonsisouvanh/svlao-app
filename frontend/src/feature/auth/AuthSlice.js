import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/utils";
import axios from "../../../../backend/utils/axiosConfig";

const initialState = {
  auth: sessionStorage.getItem("authInfo")
    ? JSON.parse(sessionStorage.getItem("authInfo") || "")
    : null,
  status: {
    setInfo: "idle" | "loading" | "succeeded" | "failed",
    signup: "idle" | "loading" | "succeeded" | "failed",
    signin: "idle" | "loading" | "succeeded" | "failed",
    signout: "idle" | "loading" | "succeeded" | "failed",
  },
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
        "/users",
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
        "/users/login",
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
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const formattedData = {
        ...userData,
        university: {
          universityId: userData?.university?.universityId,
          shortcut: userData.university.shortcut,
        },
        // visa: {
        //   from: formatDate(data.visa.from),
        //   to: formatDate(data.visa.to),
        // },
        // dob: formatDate(data.dob),
        // passport: {
        //   ...data.passport,
        //   expired: formatDate(data.passport.expired),
        // },
      };
      const { data } = await axios.put(
        "/users/profile",
        {
          ...formattedData,
        },
        config,
      );
      sessionStorage.setItem("authInfo", JSON.stringify(data));
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

const setAuthInfo = (state, action) => {
  state.auth = action.payload;
};
const statusReset = (state) => {
  state.status = {
    setInfo: "idle",
    signup: "idle",
    signin: "idle",
    signout: "idle",
  };
  state.error = null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: statusReset,
    setAuth: setAuthInfo,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status.signup = "loading";
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status.signup = "succeeded";
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status.signup = "failed";
        state.auth = null;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.status.signin = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status.signin = "succeeded";
        state.auth = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status.signin = "failed";
        state.auth = null;
        state.error = action.payload;
      })
      .addCase(signOut.pending, (state) => {
        state.status.signout = "loading";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status.signout = "idle";
        state.auth = null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status.setInfo = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status.setInfo = "succeeded";
        state.auth = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status.setInfo = "failed";
        state.auth = null;
        state.error = action.payload;
      });
  },
});

export const { reset: authReset, setAuth } = authSlice.actions;
export default authSlice.reducer;
