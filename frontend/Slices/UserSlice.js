import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  status: 'idle',
  error: null
};

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, profileImage, name, username }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', profileImage);
      formData.append('name', name);
      formData.append('username', username);

      const response = await axios.put(`/api/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserStatus : (state, action) => {
        state.status = action.payload;
    },
    setUserError : (state, action) => {
        state.status = action.payload;
    }
  },
});

export const {setUserStatus,setUserError} = userSlice.actions;
export default userSlice.reducer;
