import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

const initialState = {
  universities: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: "",
};

// ADMIN ADD STUDENT
export const addUniversity = createAsyncThunk(
  "universities/addUniversity",
  async (newStudent, { rejectWithValue }) => {
    try {
      console.log("first");
    } catch (error) {
      const errorMessage = error.message;
      const customError = {
        message: errorMessage,
        type: "addUniversityError",
      };
      console.error(error);
      toast.error(errorMessage);
      return rejectWithValue(customError);
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

export const deleteUniversity = createAsyncThunk(
  "universities/deleteUniversity",
  async (universityId, { rejectWithValue }) => {
    try {
      console.log("first");
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
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

const UniversitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUniversity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listUniversity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.universities = action.payload;
      })
      .addCase(listUniversity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // ADD
      .addCase(addUniversity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUniversity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.universities.push(action.payload);
      })
      .addCase(addUniversity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // UPDATE ADMIN
      .addCase(updateUniversity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUniversity.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedStudent = action.payload;
        const studentIndex = state.universities.findIndex(
          (student) => student.id === updatedStudent.id,
        );
        if (studentIndex !== -1) {
          state.universities[studentIndex] = updatedStudent;
        }
      })
      .addCase(updateUniversity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // // DELETE
      .addCase(deleteUniversity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUniversity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (student) => student.id !== action.payload,
        );
      })
      .addCase(deleteUniversity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export default UniversitySlice.reducer;
