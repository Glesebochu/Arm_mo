import { GoalsTable } from "../components/GoalsTable.jsx";
import React, { useState } from "react";

// For obtaining data from the backend
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../slices/GoalsSlice.js";
import { useEffect } from "react";

export function Goals() {
  const dispatch = useDispatch();
  const goals = useSelector(state => state.Goals.goals); // Ensure you are accessing the correct state

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <div>
      <h2>Goals</h2>
      {goals && goals.length > 0 ? (
        <GoalsTable goals={goals} />
      ) : (
        null
      )}
    </div>
  );
}