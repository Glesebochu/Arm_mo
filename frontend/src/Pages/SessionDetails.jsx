import React from "react";
import { useParams, useLocation } from "react-router-dom";

function SessionDetails() {
  const { sessionId } = useParams();
  const location = useLocation();
  const sessionData = location.state?.session;

  if (!sessionData) {
    return <div>No session data available.</div>;
  }

  return (
    <div>
      <h1>Session Details</h1>
      <p>Session ID: {sessionData.id}</p>
      <p>Time: {sessionData.time}</p>
      <p>Aha Moments: {sessionData.ahaMoments}</p>
      <p>Practiced Stages: {sessionData.practicedStages}</p>
      <p>Observable Objects: {sessionData.observableObjects}</p>
      <p>Mastered Stages: {sessionData.masteredStages}</p>
    </div>
  );
}

export default SessionDetails;
