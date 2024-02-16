// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_API_PORT}`;

// const initialState = {
//   users: [],
//   status: {
//     fetchAll: "idle" | "loading" | "succeeded" | "failed",
//     create: "idle" | "loading" | "succeeded" | "failed",
//     update: "idle" | "loading" | "succeeded" | "failed",
//     remove: "idle" | "loading" | "succeeded" | "failed",
//     reset: "idle" | "loading" | "succeeded" | "failed",
//   },
//   error: "",
//   page: 1,
//   pages: 0,
// };

// export const resetPassword = createAsyncThunk(
//   "user/resetPassword",
//   async (userData, thunkAPI) => {
//     try {
//       const { auth } = thunkAPI.getState().auth;
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${auth.token}`,
//         },
//       };

//       await axios.post(
//         `/api/users/resetPassword`,
//         {
//           userId: userData.userId,
//           password: userData.newPassword,
//           emailAddress: userData.emailAddress,
//         },
//         config,
//       );
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

// // Login user
// export const listUsers = createAsyncThunk(
//   "user/listUsers",
//   async ({ pageNumber, keyword = "" }, thunkAPI) => {
//     try {
//       const { auth } = thunkAPI.getState().auth;
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${auth.token}`,
//         },
//       };
//       // const { data } = await axios.get(
//       //   keyword || keyword === ""
//       //     ? `/api/users?keyword=${keyword}&pageNumber=${pageNumber}`
//       //     : `/api/users?keyword=${keyword}&pageNumber=${pageNumber}`,
//       //   config,
//       // );
//       const { data } = await axios.get(
//         `/api/users?keyword=${keyword}&pageNumber=${pageNumber}`,
//         config,
//       );
//       return data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async (userData, thunkAPI) => {
//     try {
//       const { auth } = thunkAPI.getState().auth;
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${auth.token}`,
//         },
//       };
//       const formattedData = {
//         ...userData,
//         university: {
//           universityId: userData?.university?.universityId,
//           shortcut: userData.university.shortcut,
//         },
//       };
//       const { data } = await axios.put(
//         `/api/users/${userData._id}`,
//         {
//           ...formattedData,
//         },
//         config,
//       );
//       return data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

// // Role: Admin
// export const removeUser = createAsyncThunk(
//   "user/removeUser",
//   async (id, thunkAPI) => {
//     const auth = sessionStorage.getItem("authInfo")
//       ? JSON.parse(sessionStorage.getItem("authInfo") || "")
//       : null;
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${auth.token}`,
//         },
//       };
//       const res = await axios.delete(`/api/users/${id}`, config);
//       const _id = res.data._id;
//       return _id;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

// // Create student
// export const createStudent = createAsyncThunk(
//   "student/createStudent",
//   async (studentData, thunkAPI) => {
//     try {
//       const { auth } = thunkAPI.getState().auth;
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${auth.token}`,
//         },
//       };

//       const { data } = await axios.post(
//         "/api/users/create",
//         studentData,
//         config,
//       );
//       return data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

// const resetStatus = (state) => {
//   state.status = {
//     fetchAll: "idle",
//     create: "idle",
//     update: "idle",
//     remove: "idle",
//     reset: "idle",
//   };
//   state.error = "";
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     reset: resetStatus,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(listUsers.pending, (state) => {
//         state.status.fetchAll = "loading";
//       })
//       .addCase(listUsers.fulfilled, (state, action) => {
//         state.status.fetchAll = "succeeded";
//         state.users = action.payload.users;
//         state.page = action.payload.page;
//         state.pages = action.payload.pages;
//         state.error = null;
//       })
//       .addCase(listUsers.rejected, (state, action) => {
//         state.status.fetchAll = "failed";
//         state.users = null;
//         state.error = action.payload;
//       })

//       .addCase(updateUser.pending, (state) => {
//         state.status.update = "loading";
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.status.update = "succeeded";
//         const updatedUserIndex = state.users.findIndex(
//           (user) => user._id === action.payload._id,
//         );
//         if (updatedUserIndex !== -1) {
//           state.users[updatedUserIndex] = action.payload;
//         }
//         state.error = null;
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.status.update = "failed";
//         state.error = action.payload;
//       })

//       .addCase(removeUser.pending, (state) => {
//         state.status.remove = "loading";
//       })
//       .addCase(removeUser.fulfilled, (state, action) => {
//         state.status.remove = "succeeded";
//         state.users = state.users.filter((user) => user._id !== action.payload);
//         state.error = null;
//       })
//       .addCase(removeUser.rejected, (state, action) => {
//         state.status.remove = "failed";
//         state.error = action.payload;
//       })

//       .addCase(createStudent.pending, (state) => {
//         state.status.create = "loading";
//       })
//       .addCase(createStudent.fulfilled, (state, action) => {
//         state.status.create = "succeeded";
//         state.users.push(action.payload);
//         state.error = null;
//       })
//       .addCase(createStudent.rejected, (state, action) => {
//         state.status.create = "failed";
//         state.error = action.payload;
//       })

//       .addCase(resetPassword.pending, (state) => {
//         state.status.reset = "loading";
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.status.reset = "succeeded";
//         state.error = null;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.status.reset = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { reset: userReset } = userSlice.actions;
// export default userSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_API_PORT}`;

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

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (userData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      await axios.post(
        `/api/users/resetPassword`,
        {
          userId: userData.userId,
          password: userData.newPassword,
          emailAddress: userData.emailAddress,
        },
        config,
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

export const getFilteredUsers = createAsyncThunk(
  "user/listFilteredUsers",
  async (filter, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      // Constructing the query string dynamically based on the filter object
      const queryString = Object.keys(filter)
        .map((key) => `${key}=${filter[key]}`)
        .join("&");
      const { data } = await axios.get(
        `/api/users/filter?${queryString}`,
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
      const formattedData = {
        ...userData,
        university: {
          universityId: userData?.university?.universityId,
          shortcut: userData.university.shortcut,
        },
      };
      const { data } = await axios.put(
        `/api/users/${userData._id}`,
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
    const auth = sessionStorage.getItem("authInfo")
      ? JSON.parse(sessionStorage.getItem("authInfo") || "")
      : null;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const res = await axios.delete(`/api/users/${id}`, config);
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
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/users/create",
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
