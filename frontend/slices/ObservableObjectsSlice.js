import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { webRoot } from "../constants/constants";

const initialState = {
  isLoading: false,
  error: [],
  isError: false,
  observableObjects: [],
};

export const getAllObservableObjects = createAsyncThunk(
  "ObservableObjects/getAll",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${webRoot}/ObservableObjects/GetAll`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for creating a new observable object
export const createObservableObject = createAsyncThunk(
  "ObservableObjects/createObservableObject",
  async (newObservableObject, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${webRoot}/ObservableObjects/Create`,
        newObservableObject
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for updating an existing observable object
export const updateObservableObject = createAsyncThunk(
  "ObservableObjects/updateObservableObject",
  async (updatedObservableObject, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${webRoot}/ObservableObjects/Update`,
        updatedObservableObject
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for deleting an observable object
export const deleteObservableObject = createAsyncThunk(
  "ObservableObjects/deleteObservableObject",
  async (observableObjectId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${webRoot}/ObservableObjects/Delete/${observableObjectId}`
      );
      return observableObjectId;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const ObservableObjectsSlice = createSlice({
  name: "ObservableObjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For getting all observable objects
      .addCase(getAllObservableObjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllObservableObjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.observableObjects = action.payload;
      })
      .addCase(getAllObservableObjects.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // For creating a new observable object
      .addCase(createObservableObject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createObservableObject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.observableObjects.push(action.payload);
      })
      .addCase(createObservableObject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // For updating an existing observable object
      .addCase(updateObservableObject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateObservableObject.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.observableObjects.findIndex(
          (observableObject) => observableObject.id === action.payload.id
        );
        if (index !== -1) {
          state.observableObjects[index] = action.payload;
        }
      })
      .addCase(updateObservableObject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // For deleting an observable object
      .addCase(deleteObservableObject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteObservableObject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.observableObjects = state.observableObjects.filter(
          (observableObject) => observableObject.id !== action.payload
        );
      })
      .addCase(deleteObservableObject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ObservableObjectsSlice.reducer;
