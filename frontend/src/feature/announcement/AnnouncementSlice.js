import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_API_PORT}`;

const initialState = {
  announcements: [],
  status: {
    fetchAll: "idle" | "loading" | "succeeded" | "failed",
    fetchOne: "idle" | "loading" | "succeeded" | "failed",
    create: "idle" | "loading" | "succeeded" | "failed",
    update: "idle" | "loading" | "succeeded" | "failed",
    remove: "idle" | "loading" | "succeeded" | "failed",
  },
  error: null,
  page: 1,
  pages: 0,
};

export const createAnnouncement = createAsyncThunk(
  "announcements/addAnnouncement",
  async (inputData, thunkAPI) => {
    console.log("🚀 ~ inputData:", inputData);
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/announcements",
        inputData,
        config,
      );
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

export const updateAnnouncement = createAsyncThunk(
  "announcements/updateAnnouncement",
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
        `/api/announcements/${inputData._id}`,
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

export const removeAnnouncement = createAsyncThunk(
  "announcements/removeAnnouncement",
  async (announcementId, thunkAPI) => {
    const { auth } = thunkAPI.getState().auth;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const res = await axios.delete(
        `/api/announcements/${announcementId}`,
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

export const listAnnouncements = createAsyncThunk(
  "announcement/listAnnouncements",
  async ({ pageNumber, keyword = "" }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/announcements?keyword=${keyword}&pageNumber=${pageNumber}`,
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

export const getAnnouncementById = createAsyncThunk(
  "announcements/getAnnouncementById",
  async (announcementId, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `/api/announcements/${announcementId}`,
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

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    reset: resetStatus,
    setError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(listAnnouncements.pending, (state) => {
        state.status.fetchAll = "loading";
      })
      .addCase(listAnnouncements.fulfilled, (state, action) => {
        state.status.fetchAll = "succeeded";
        state.announcements = action.payload.announcements;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.error = null;
      })
      .addCase(listAnnouncements.rejected, (state, action) => {
        state.status.fetchAll = "failed";
        state.announcements = null;
        setError(state, action);
      })

      .addCase(getAnnouncementById.pending, (state) => {
        state.status.fetchOne = "loading";
      })
      .addCase(getAnnouncementById.fulfilled, (state, action) => {
        state.status.fetchOne = "succeeded";
        state.announcements = [{ ...action.payload }];
      })
      .addCase(getAnnouncementById.rejected, (state, action) => {
        state.status.fetchOne = "failed";
        setError(state, action);
      })

      // ADD
      .addCase(createAnnouncement.pending, (state) => {
        state.status.create = "loading";
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.announcements = [...state.announcements, action.payload.data];
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.status.create = "failed";
        setError(state, action);
      })

      // UPDATE ADMIN
      .addCase(updateAnnouncement.pending, (state) => {
        state.status.update = "loading";
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        const updatedAnnouncementIndex = state.announcements.findIndex(
          (announcement) => announcement._id === action.payload._id,
        );
        if (updatedAnnouncementIndex !== -1) {
          state.announcements[updatedAnnouncementIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.status.update = "failed";
        setError(state, action);
      })

      // DELETE
      .addCase(removeAnnouncement.pending, (state) => {
        state.status.remove = "loading";
      })
      .addCase(removeAnnouncement.fulfilled, (state, action) => {
        state.status.remove = "succeeded";
        state.announcements = state.announcements.filter(
          (announcement) => announcement._id !== action.payload,
        );
        state.error = null;
      })
      .addCase(removeAnnouncement.rejected, (state, action) => {
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

export const { reset: announcementReset } = announcementSlice.actions;

export default announcementSlice.reducer;
