import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import AuthReducer from "../slices/AuthSlice";
import UserAccountReducer from "../slices/UserSlice";
import goalReducer from "../slices/GoalsSlice";
import sessionReducer from "../slices/SessionsSlice";
import preparationPhaseReducer from "../slices/PreparationPhaseSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Account: UserAccountReducer,
    Goals: goalReducer,
    PreparationPhase: preparationPhaseReducer,
    Session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
