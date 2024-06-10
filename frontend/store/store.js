import {configureStore} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import AuthReducer from "../slices/AuthSlice";

export const store = configureStore({
  reducer: {Auth: AuthReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});