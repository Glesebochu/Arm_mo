import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import goalReducer from "../slices/GoalsSlice";

export const store = configureStore({
    reducer: { Goals: goalReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});