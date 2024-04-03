import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../backend/utils/axiosConfig";

const initialState = {
  documents: [],
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

export const createDocument = createAsyncThunk(
  "documents/addDocument",
  async (inputData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.post("/documents", inputData, config);
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

export const updateDocument = createAsyncThunk(
  "documents/updateDocument",
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
        `/documents/${inputData.id}`,
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

export const removeDocument = createAsyncThunk(
  "documents/removeDocument",
  async (documentId, thunkAPI) => {
    const { auth } = thunkAPI.getState().auth;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const res = await axios.delete(`/documents/${documentId}`, config);
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

export const listDocuments = createAsyncThunk(
  "document/listDocuments",
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
        `/documents?keyword=${keyword}&pageNumber=${pageNumber}`,
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

export const getDocumentById = createAsyncThunk(
  "documents/getDocumentById",
  async (documentId, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(`/documents/${documentId}`, config);
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

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    reset: resetStatus,
    setError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(listDocuments.pending, (state) => {
        state.status.fetchAll = "loading";
      })
      .addCase(listDocuments.fulfilled, (state, action) => {
        state.status.fetchAll = "succeeded";
        state.documents = action.payload.documents;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.error = null;
      })
      .addCase(listDocuments.rejected, (state, action) => {
        state.status.fetchAll = "failed";
        state.documents = null;
        setError(state, action);
      })

      .addCase(getDocumentById.pending, (state) => {
        state.status.fetchOne = "loading";
      })
      .addCase(getDocumentById.fulfilled, (state, action) => {
        state.status.fetchOne = "succeeded";
        state.documents = [{ ...action.payload }];
      })
      .addCase(getDocumentById.rejected, (state, action) => {
        state.status.fetchOne = "failed";
        setError(state, action);
      })

      // ADD
      .addCase(createDocument.pending, (state) => {
        state.status.create = "loading";
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.documents = [...state.documents, action.payload.data];
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.status.create = "failed";
        setError(state, action);
      })

      // UPDATE ADMIN
      .addCase(updateDocument.pending, (state) => {
        state.status.update = "loading";
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        const updatedDocumentIndex = state.documents.findIndex(
          (document) => document._id === action.payload._id,
        );
        if (updatedDocumentIndex !== -1) {
          state.documents[updatedDocumentIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.status.update = "failed";
        setError(state, action);
      })

      // DELETE
      .addCase(removeDocument.pending, (state) => {
        state.status.remove = "loading";
      })
      .addCase(removeDocument.fulfilled, (state, action) => {
        state.status.remove = "succeeded";
        state.documents = state.documents.filter(
          (document) => document._id !== action.payload,
        );
        state.error = null;
      })
      .addCase(removeDocument.rejected, (state, action) => {
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

export const { reset: documentReset } = documentSlice.actions;

export default documentSlice.reducer;
