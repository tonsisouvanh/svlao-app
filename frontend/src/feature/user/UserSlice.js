import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequestPrivate } from "../../utils/axiosConfig";
import { formatDate } from "../../utils/utils";
const initialState = {
  users: [],
  status: {
    fetchAll: "idle" | "loading" | "succeeded" | "failed",
    create: "idle" | "loading" | "succeeded" | "failed",
    update: "idle" | "loading" | "succeeded" | "failed",
    remove: "idle" | "loading" | "succeeded" | "failed",
    reset: "idle" | "loading" | "succeeded" | "failed",
  },
  error: "",
  page: 1,
  pages: 0,
  total: 0,
};
// TODO: fix reset password after added refresh token
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (userData, thunkAPI) => {
    try {
      await apiRequestPrivate.post(
        `/users/reset-password`,
        {
          userId: userData.userId,
          password: userData.newPassword,
          emailAddress: userData.emailAddress,
        }
      );
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

// Login user
export const listUsers = createAsyncThunk(
  "user/listUsers",
  async ({ pageNumber, keyword = "" }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await apiRequestPrivate.get(
        `/users?keyword=${keyword}&pageNumber=${pageNumber}`,
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

export const getFilteredUsers = createAsyncThunk(
  "user/getFilteredUsers",
  async (filter, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Constructing the query string dynamically based on the filter object
      const queryString = Object.keys(filter)
        .map((key) => `${key}=${filter[key]}`)
        .join("&");
      const { data } = await apiRequestPrivate.get(
        `/users/filter?${queryString}`,
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
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const formattedData = {
        ...userData,
        university: {
          universityId: userData?.university?.universityId,
          shortcut: userData.university.shortcut,
        },
      };
      const { data } = await apiRequestPrivate.put(
        `/users/${userData._id}`,
        {
          ...formattedData,
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

// Role: Admin
export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await apiRequestPrivate.delete(`/users/${id}`, config);
      const _id = res.data._id;
      return _id;
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

// Create student
export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (studentData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await apiRequestPrivate.post(
        "/users/create",
        studentData,
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

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await apiRequestPrivate.get(`/users/profile`, config);
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
  state.status = {
    fetchAll: "idle",
    create: "idle",
    update: "idle",
    remove: "idle",
    reset: "idle",
  };
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
        state.status.fetchAll = "loading";
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.status.fetchAll = "succeeded";
        state.users = action.payload.users;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.error = null;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.status.fetchAll = "failed";
        state.users = null;
        state.error = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.status.fetchAll = "loading";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status.fetchAll = "succeeded";
        state.users = [{ ...action.payload }];
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status.fetchAll = "failed";
        state.users = null;
        state.error = action.payload;
      })

      .addCase(getFilteredUsers.pending, (state) => {
        state.status.fetchAll = "loading";
      })
      .addCase(getFilteredUsers.fulfilled, (state, action) => {
        state.status.fetchAll = "succeeded";
        state.users = action.payload.users;
        state.page = action.payload.currentPage;
        state.pages = action.payload.itemsPerPage;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(getFilteredUsers.rejected, (state, action) => {
        state.status.fetchAll = "failed";
        state.users = null;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.status.update = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        const updatedUserIndex = state.users.findIndex(
          (user) => user._id === action.payload._id,
        );
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status.update = "failed";
        state.error = action.payload;
      })

      .addCase(removeUser.pending, (state) => {
        state.status.remove = "loading";
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.status.remove = "succeeded";
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.error = null;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.status.remove = "failed";
        state.error = action.payload;
      })

      .addCase(createStudent.pending, (state) => {
        state.status.create = "loading";
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.status.create = "failed";
        state.error = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.status.reset = "loading";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status.reset = "succeeded";
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status.reset = "failed";
        state.error = action.payload;
      });
  },
});

export const { reset: userReset } = userSlice.actions;
export default userSlice.reducer;
