import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: "",
  isError: false,
  isAuthenticated: false,
  user: null,
};

export const loginWithGoogle = createAsyncThunk(
  "Auth/loginWithGoogle",
  async (arg, ThunkAPi) => {
    try {
      const response = await axios.post(
        "http://localhost:5158/api/Auth/google",
        arg,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("registered successfully!");
        return response.data;
      }
    } catch (error) {
      console.log("Error occured! oops...");
      return ThunkAPi.rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "Auth/register",
  async (arg, ThunkAPi) => {
    try {
      const response = await axios.post(
        "http://localhost:5158/api/Auth/register",
        arg
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return ThunkAPi.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk("Auth/login", async (arg, ThunkAPi) => {
  try {
    const response = await axios.post(
      "http://localhost:5158/api/Auth/login",
      arg,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return ThunkAPi.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5158/api/Auth/logout",
        null,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Failed to logout");
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMe = createAsyncThunk("Auth/fetchMe", async (_, ThunkAPi) => {
  try {
    const response = await axios.get("http://localhost:5158/api/Auth/me", {
      withCredentials: true,
    });
    if (response.status === 200) {
      console.log(response.data, "This is the output we want!!");
      return response.data;
    }
  } catch (error) {
    return ThunkAPi.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
        state.isError = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isError = true;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.isError = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isError = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
