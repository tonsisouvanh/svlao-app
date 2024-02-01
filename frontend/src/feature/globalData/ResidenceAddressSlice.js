import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_API_PORT}`;

const initialState = {
  residenceAddresses: [],
  status: {
    list: "idle" | "loading" | "succeeded" | "failed",
    create: "idle" | "loading" | "succeeded" | "failed",
    update: "idle" | "loading" | "succeeded" | "failed",
    remove: "idle" | "loading" | "succeeded" | "failed",
  },
  error: null,
};

export const createResidenceAddress = createAsyncThunk(
  "residenceAddresses/addResidenceAddress",
  async (inputData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/residenceAddresses",
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

export const updateResidenceAddress = createAsyncThunk(
  "residenceAddresses/updateResidenceAddress",
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
        `/api/residenceAddresses/${inputData._id}`,
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

export const removeResidenceAddress = createAsyncThunk(
  "residenceAddresses/removeResidenceAddress",
  async (residenceAddressId, thunkAPI) => {
    const { auth } = thunkAPI.getState().auth;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const res = await axios.delete(
        `/api/residenceAddresses/${residenceAddressId}`,
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

export const listResidenceAddress = createAsyncThunk(
  "residenceAddresses/listResidenceAddress",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/residenceAddresses`);
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

export const getResidenceAddressById = createAsyncThunk(
  "user/getResidenceAddressById",
  async (residenceAddressId, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `/api/residenceAddresses/${residenceAddressId}`,
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
    list: "idle",
    create: "idle",
    update: "idle",
    remove: "idle",
  };
  state.error = null;
};

const setError = (state, action) => {
  state.error = action.payload;
};

const residenceAddressSlice = createSlice({
  name: "residenceAddress",
  initialState,
  reducers: {
    reset: resetStatus,
    setError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(listResidenceAddress.pending, (state) => {
        state.status.list = "loading";
      })
      .addCase(listResidenceAddress.fulfilled, (state, action) => {
        state.status.list = "succeeded";
        state.residenceAddresses = action.payload;
      })
      .addCase(listResidenceAddress.rejected, (state, action) => {
        state.status.list = "failed";
        setError(state, action);
      })

      .addCase(getResidenceAddressById.pending, (state) => {
        state.status.list = "loading";
      })
      .addCase(getResidenceAddressById.fulfilled, (state, action) => {
        state.status.list = "succeeded";
        state.residenceAddresses = [{ ...action.payload }];
      })
      .addCase(getResidenceAddressById.rejected, (state, action) => {
        state.status.list = "failed";
        setError(state, action);
      })

      // ADD
      .addCase(createResidenceAddress.pending, (state) => {
        state.status.create = "loading";
      })
      .addCase(createResidenceAddress.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.residenceAddresses = [
          ...state.residenceAddresses,
          action.payload.data,
        ];
      })
      .addCase(createResidenceAddress.rejected, (state, action) => {
        state.status.create = "failed";
        setError(state, action);
      })

      // UPDATE ADMIN
      .addCase(updateResidenceAddress.pending, (state) => {
        state.status.update = "loading";
      })
      .addCase(updateResidenceAddress.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        const updatedResidenceAddressIndex = state.residenceAddresses.findIndex(
          (residenceAddress) => residenceAddress._id === action.payload._id,
        );
        if (updatedResidenceAddressIndex !== -1) {
          state.residenceAddresses[updatedResidenceAddressIndex] =
            action.payload;
        }
        state.error = null;
      })
      .addCase(updateResidenceAddress.rejected, (state, action) => {
        state.status.update = "failed";
        setError(state, action);
      })

      // DELETE
      .addCase(removeResidenceAddress.pending, (state) => {
        state.status.remove = "loading";
      })
      .addCase(removeResidenceAddress.fulfilled, (state, action) => {
        state.status.remove = "succeeded";
        state.residenceAddresses = state.residenceAddresses.filter(
          (residenceAddress) => residenceAddress._id !== action.payload,
        );
        state.error = null;
      })
      .addCase(removeResidenceAddress.rejected, (state, action) => {
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

export const { reset: residenceAddressReset } = residenceAddressSlice.actions;

export default residenceAddressSlice.reducer;
