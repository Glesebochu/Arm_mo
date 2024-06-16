import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  error: null
};

export const updateUserAccount = createAsyncThunk(
  'user/updateUserAccount',
  async ({ id, firstName, lastName, username, profilePicture}, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('Id', id);
      formData.append('ProfilePicture', profilePicture);
      formData.append('FirstName', firstName);
      formData.append('LastName', lastName);
      formData.append('Username', username);
      const response = await axios.put(`http://localhost:5158/api/Users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      thunkAPI.dispatch(setUserStatus("succeeded"));
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      thunkAPI.dispatch(setUserError("failed"))
      thunkAPI.dispatch(setUserError(error.response.data));
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
