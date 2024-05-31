import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { webRoot } from "../constants/constants";

const initialState = {
    isLoading: false,
    error: [],
    isError: false,
    goals: []
}

export const getAll = createAsyncThunk("Goals/getAll", async (arg, ThunkAPi) => {
    try {
        const response = await axios.get(`${webRoot}/Goals/getAll`);
        if (response.status == 200) {
            // console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data);
        return ThunkAPi.rejectWithValue(error.response.data);
    }
})

const GoalsSlice = createSlice({
    name: "Goals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.goals = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = true;
            })
    }
})

export default GoalsSlice.reducer;
