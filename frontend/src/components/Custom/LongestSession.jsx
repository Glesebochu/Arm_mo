import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LongestSession({ onSessionClick }) {
  const [duration, setDuration] = useState("");
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const fetchLongestSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5158/api/analyzer/GetLongestSessionForMeditator",
          { params: { meditatorId: 1 } }
        );

        if (response.status === 200 && response.data) {
          const { id, startDateTime, endDateTime } = response.data;
          const start = new Date(startDateTime);
          const end = new Date(endDateTime);
          const durationMs = end - start;
          const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
          const durationMinutes = Math.floor(
            (durationMs % (1000 * 60 * 60)) / (1000 * 60)
          );

          setDuration(`${durationHours}h ${durationMinutes}m`);
          setSessionId(id);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchLongestSession();
  }, []);

  const handleSessionClick = () => {
    if (sessionId) {
      onSessionClick(sessionId);
    }
  };

  return (
    <div className="circle-container" onClick={handleSessionClick}>
      <div className="circle bg-white">
        <div className="circle-content ">
          <div id="loader">
            <div className="hourglass">
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
            <div className="timeContainer">
              <p id="time">{duration}</p>
            </div>
          </div>
          <p className="text">Your Longest Session</p>
        </div>
      </div>
    </div>
  );
}
