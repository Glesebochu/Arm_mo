import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  accountStatus: 'idle',
  passwordStatus: "idle",
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
      const response = await axios.patch(`http://localhost:5158/api/Users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (accountError) {
      return "failed"
    }
  }
);


export const updateUserPassword = createAsyncThunk('user/updateUserPassword', async ({id, currentPassword, newPassword}, thunkAPI)=> {
  try {
    const response = await axios.patch(`http://localhost:5158/api/Users/${id}/password`, {
      "Id":id,
      "CurrentPassword": currentPassword,
      "NewPassword": newPassword
    }, {
      withCredentials: true
    });
    if(response.data.success == true){
      return "succeded";
    }else if(response.data.success == false){
      return "failed";
    }

    return response.data;
  }catch(accountError){
    thunkAPI.dispatch(setUserPasswordStatus("failed"));
    return "failed";
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
