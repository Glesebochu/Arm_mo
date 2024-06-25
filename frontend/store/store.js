import {configureStore} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import AuthReducer from "../slices/AuthSlice";
import UserAccountReducer from "../slices/UserSlice";

export const store = configureStore({
  reducer: {Auth: AuthReducer, Account: UserAccountReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});