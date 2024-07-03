import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { webRoot } from "../constants/constants";

const initialState = {
  isLoading: false,
  error: null,
  isError: false,
  practicingStage: null,
  sessions: [],
};

// Thunk for getting all sessions
export const getAllSessions = createAsyncThunk(
  "Sessions/getAll",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${webRoot}/Sessions/GetAll`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for getting a single session by ID
export const getSessionById = createAsyncThunk(
  "Sessions/getById",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${webRoot}/Sessions/GetById/${sessionId}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for creating a new session
export const createSession = createAsyncThunk(
  "Sessions/createSession",
  async (newSession, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${webRoot}/Sessions/Create`,
        newSession
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for updating an existing session
export const updateSession = createAsyncThunk(
  "Sessions/updateSession",
  async (updatedSession, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${webRoot}/Sessions/Update`,
        updatedSession
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for deleting a session
export const deleteSession = createAsyncThunk(
  "Sessions/deleteSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      await axios.delete(`${webRoot}/Sessions/Delete/${sessionId}`);
      return sessionId;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const SessionsSlice = createSlice({
  name: "Sessions",
  initialState,
  reducers: {
    setPracticingStage: (state, action) => {
      state.practicingStage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // For getting all sessions
      .addCase(getAllSessions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessions = action.payload;
      })
      .addCase(getAllSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // For getting a single session by ID
      .addCase(getSessionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessionById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.sessions.findIndex(
          (session) => session.id === action.payload.id
        );
        if (index !== -1) {
          state.sessions[index] = action.payload;
        } else {
          state.sessions.push(action.payload);
        }
      })
      .addCase(getSessionById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // For creating a new session
      .addCase(createSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessions.push(action.payload);
      })
      .addCase(createSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // For updating an existing session
      .addCase(updateSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.sessions.findIndex(
          (session) => session.id === action.payload.id
        );
        if (index !== -1) {
          state.sessions[index] = action.payload;
        }
      })
      .addCase(updateSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // For deleting a session
      .addCase(deleteSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessions = state.sessions.filter(
          (session) => session.id !== action.payload
        );
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPracticingStage } = SessionsSlice.actions;
export default SessionsSlice.reducer;
