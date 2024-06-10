import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the CreatePreparationPhase thunk
export const CreatePreparationPhaseThunk = createAsyncThunk(
  "preparationPhase/CreatePreparationPhase",
  async (preparationPhaseData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${webRoot}/PreparationPhase/Create`,
        preparationPhaseData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define the UpdatePreparationPhase thunk
export const UpdatePreparationPhase = createAsyncThunk(
  "preparationPhase/UpdatePreparationPhase",
  async ({ id, preparationPhaseData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${webRoot}/PreparationPhase/Update/{id}`,
        preparationPhaseData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define the DeletePreparationPhase thunk
export const DeletePreparationPhase = createAsyncThunk(
  "preparationPhase/DeletePreparationPhase",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(
        `${webRoot}/PreparationPhase/Delete/{id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define the GetPreparationPhase thunk
export const GetPreparationPhase = createAsyncThunk(
  "preparationPhase/GetPreparationPhase",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(
        `${webRoot}/PreparationPhase/GetById/{id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define the slice
const preparationPhaseSlice = createSlice({
  name: "preparationPhase",
  initialState: {
    preparationPhase: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreatePreparationPhaseThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreatePreparationPhaseThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.preparationPhase = action.payload;
      })
      .addCase(CreatePreparationPhaseThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(UpdatePreparationPhase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdatePreparationPhase.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.preparationPhase = action.payload;
      })
      .addCase(UpdatePreparationPhase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(DeletePreparationPhase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeletePreparationPhase.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.preparationPhase = null; // Or handle the state update as needed
      })
      .addCase(DeletePreparationPhase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(GetPreparationPhase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetPreparationPhase.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.preparationPhase = action.payload;
      })
      .addCase(GetPreparationPhase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default preparationPhaseSlice.reducer;
