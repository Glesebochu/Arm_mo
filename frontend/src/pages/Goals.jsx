import { GoalsTable } from "../components/GoalsTable.jsx";
import React, { useState } from "react";

// For obtaining data from the backend
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../slices/GoalsSlice.js";
import { useEffect } from "react";

export function Goals() {
  const dispatch = useDispatch();
  const { goals } = useSelector((state) => state.Goals);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  const goalsDummy = [
    {
      Id: 1,
      Status: "NotStarted",
      Activity: "Jog",
      MeditationObject: "5 kilometers",
      DueDate: "2024-06-15 07:00:00",
    },
    {
      Id: 2,
      Status: "Underway",
      Activity: "Cook",
      MeditationObject: "a healthy meal",
      DueDate: "2024-06-15 12:00:00",
    },
    {
      Id: 3,
      Status: "Done",
      Activity: "Practice",
      MeditationObject: "a 30-minute Yoga session",
      DueDate: "2024-06-14 06:30:00",
    },
    {
      Id: 4,
      Status: "NotStarted",
      Activity: "Read",
      MeditationObject: "2 chapters of a book",
      DueDate: "2024-06-16 18:00:00",
    },
    {
      Id: 5,
      Status: "Underway",
      Activity: "Write",
      MeditationObject: "a short story",
      DueDate: "2024-06-17 20:00:00",
    },
    {
      Id: 6,
      Status: "Done",
      Activity: "Paint",
      MeditationObject: "a landscape",
      DueDate: "2024-06-14 10:00:00",
    },
    {
      Id: 7,
      Status: "NotStarted",
      Activity: "Meditate",
      MeditationObject: "for 20 minutes",
      DueDate: "2024-06-18 06:00:00",
    },
    {
      Id: 8,
      Status: "Underway",
      Activity: "Clean",
      MeditationObject: "the kitchen",
      DueDate: "2024-06-19 14:00:00",
    },
    {
      Id: 9,
      Status: "Done",
      Activity: "Exercise",
      MeditationObject: "a full body workout",
      DueDate: "2024-06-14 08:00:00",
    },
    {
      Id: 10,
      Status: "NotStarted",
      Activity: "Study",
      MeditationObject: "a new programming language",
      DueDate: "2024-06-20 09:00:00",
    },
  ];

  const notStartedGoals = goalsDummy.filter((g) => g.Status == "NotStarted");
  const underwayGoals = goalsDummy.filter((g) => g.Status == "Underway");
  const doneGoals = goalsDummy.filter((g) => g.Status == "Done");

  return (
    <div>
      <h2>Goals</h2>
      <h3>Not Started</h3>

      {goals.length != 0 ? <GoalsTable goals={goalsDummy} /> : <h2>Errorie</h2>}

      {/* <h3>Underway</h3>
            <GoalsTable goals={underwayGoals} />
            <h3>Done</h3>
            <GoalsTable goals={doneGoals} />
            <h3>Blabber</h3>
            <GoalsTable goals={null} /> */}
    </div>
  );
}