import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_API_PORT}`;

const initialState = {
  universities: [],
  listStatus: "idle" | "loading" | "succeeded" | "failed",
  createStatus: "idle" | "loading" | "succeeded" | "failed",
  updateStatus: "idle" | "loading" | "succeeded" | "failed",
  removeStatus: "idle" | "loading" | "succeeded" | "failed",
  error: "",
};

// ADMIN ADD STUDENT
export const createUniversity = createAsyncThunk(
  "universities/addUniversity",
  async (inputData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.post("/api/universities", inputData, config);
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

// ADMIN UPDATE
export const updateUniversity = createAsyncThunk(
  "universities/updateUniversity",
  async (updatedStudent, { rejectWithValue }) => {
    try {
      console.log("first");
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);
// Role: Admin
export const removeUniversity = createAsyncThunk(
  "universities/removeUniversity",
  async (universityId, thunkAPI) => {
    const { auth } = thunkAPI.getState().auth;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const res = await axios.delete(
        `/api/universities/${universityId}`,
        config,
      );
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

export const listUniversity = createAsyncThunk(
  "universities/listUniversity",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/universities`);
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

const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {
    reset: resetStatus,
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUniversity.pending, (state) => {
        state.listStatus = "loading";
      })
      .addCase(listUniversity.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.universities = action.payload;
      })
      .addCase(listUniversity.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = action.error.message || "";
      })
      // ADD
      .addCase(createUniversity.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createUniversity.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.universities.push(action.payload);
      })
      .addCase(createUniversity.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error.message || "";
      })
      // // UPDATE ADMIN
      // .addCase(updateUniversity.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(updateUniversity.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   const updatedStudent = action.payload;
      //   const studentIndex = state.universities.findIndex(
      //     (student) => student.id === updatedStudent.id,
      //   );
      //   if (studentIndex !== -1) {
      //     state.universities[studentIndex] = updatedStudent;
      //   }
      // })
      // .addCase(updateUniversity.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message || "";
      // })
      // // DELETE
      .addCase(removeUniversity.pending, (state) => {
        state.removeStatus = "loading";
      })
      .addCase(removeUniversity.fulfilled, (state, action) => {
        state.removeStatus = "succeeded";
        state.universities = state.universities.filter(
          (university) => university._id !== action.payload,
        );
        state.error = null;
      })
      .addCase(removeUniversity.rejected, (state, action) => {
        state.removeStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { reset: universityReset } = universitySlice.actions;

export default universitySlice.reducer;
