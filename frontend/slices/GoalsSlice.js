import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { webRoot } from "../constants/constants";

const initialState = {
    isLoading: false,
    error: [],
    isError: false,
    goals: []
}

export const getAll = createAsyncThunk(
    "Goals/getAll",
    async (arg, ThunkAPi) => {
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

// Thunk for creating a new goal
export const createGoal = createAsyncThunk(
    'goals/createGoal',
    async (newGoal, { rejectWithValue }) => {
        try {
            const response = await axios.post('${webRoot}/Goals/Create', newGoal);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const GoalsSlice = createSlice({
    name: "Goals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // For getting all goals
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

            // For creating a new goal
            .addCase(createGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.loading = false;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default GoalsSlice.reducer;
