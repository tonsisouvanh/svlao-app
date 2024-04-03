import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../backend/utils/axiosConfig";

const initialState = {
  universities: [],
  status: {
    fetchAll: "idle" | "loading" | "succeeded" | "failed",
    fetchOne: "idle" | "loading" | "succeeded" | "failed",
    create: "idle" | "loading" | "succeeded" | "failed",
    update: "idle" | "loading" | "succeeded" | "failed",
    remove: "idle" | "loading" | "succeeded" | "failed",
  },
  error: null,
};

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

      const { data } = await axios.post("/universities", inputData, config);
      return { data };
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

export const updateUniversity = createAsyncThunk(
  "universities/updateUniversity",
  async (inputData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.put(
        `/universities/${inputData._id}`,
        {
          ...inputData,
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
        `/universities/${universityId}`,
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
      const { data } = await axios.get(`/universities`);
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

export const getUniversityById = createAsyncThunk(
  "user/getUniversityById",
  async (universityId, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `/universities/${universityId}`,
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
    fetchOne: "idle",
    create: "idle",
    update: "idle",
    remove: "idle",
  };
  state.error = null;
};

const setError = (state, action) => {
  state.error = action.payload;
};

const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {
    reset: resetStatus,
    setError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUniversity.pending, (state) => {
        state.status.fetchAll = "loading";
      })
      .addCase(listUniversity.fulfilled, (state, action) => {
        state.status.fetchAll = "succeeded";
        state.universities = action.payload;
      })
      .addCase(listUniversity.rejected, (state, action) => {
        state.status.fetchAll = "failed";
        setError(state, action);
      })

      .addCase(getUniversityById.pending, (state) => {
        state.status.fetchOne = "loading";
      })
      .addCase(getUniversityById.fulfilled, (state, action) => {
        state.status.fetchOne = "succeeded";
        state.universities = [{ ...action.payload }];
      })
      .addCase(getUniversityById.rejected, (state, action) => {
        state.status.fetchOne = "failed";
        setError(state, action);
      })

      // ADD
      .addCase(createUniversity.pending, (state) => {
        state.status.create = "loading";
      })
      .addCase(createUniversity.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.universities = [...state.universities, action.payload.data];
      })
      .addCase(createUniversity.rejected, (state, action) => {
        state.status.create = "failed";
        setError(state, action);
      })

      // UPDATE ADMIN
      .addCase(updateUniversity.pending, (state) => {
        state.status.update = "loading";
      })
      .addCase(updateUniversity.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        const updatedUniversityIndex = state.universities.findIndex(
          (university) => university._id === action.payload._id,
        );
        if (updatedUniversityIndex !== -1) {
          state.universities[updatedUniversityIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUniversity.rejected, (state, action) => {
        state.status.update = "failed";
        setError(state, action);
      })

      // DELETE
      .addCase(removeUniversity.pending, (state) => {
        state.status.remove = "loading";
      })
      .addCase(removeUniversity.fulfilled, (state, action) => {
        state.status.remove = "succeeded";
        state.universities = state.universities.filter(
          (university) => university._id !== action.payload,
        );
        state.error = null;
      })
      .addCase(removeUniversity.rejected, (state, action) => {
        state.status.remove = "failed";
        setError(state, action);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.error = null;
        },
      );
  },
});

export const { reset: universityReset } = universitySlice.actions;

export default universitySlice.reducer;
