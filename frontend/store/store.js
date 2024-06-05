import {configureStore} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import AuthReducer from "../Slices/AuthSlice";

export const store = configureStore({
  reducer: {Auth: AuthReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});