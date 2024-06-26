import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import goalReducer from "../slices/GoalsSlice";
import preparationPhaseReducer from "../slices/PreparationPhaseSlice";

export const store = configureStore({
  reducer: { Goals: goalReducer, PreparationPhase: preparationPhaseReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
