import React, { useEffect, useState } from "react";
import axios from "axios";
import "@/Styles/LongestSession.css";

export default function SessionDuration({ sessionId }) {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const fetchSessionDuration = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/Analyzer/GetSession?SessionId=${sessionId}`
        );

        if (response.status === 200 && response.data) {
          const { startDateTime, endDateTime } = response.data;
          const start = new Date(startDateTime);
          const end = new Date(endDateTime);
          const durationMs = end - start;
          const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
          const durationMinutes = Math.floor(
            (durationMs % (1000 * 60 * 60)) / (1000 * 60)
          );

          setDuration(`${durationHours}h ${durationMinutes}m`);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchSessionDuration();
  }, [sessionId]);

  return (
    <div className="circle-container">
      <div className="circle">
        <div className="circle-content">
          <div id="loader">
            <div className="hourglass">
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
            <div className="timeContainer">
              <p id="time">{duration}</p>
            </div>
          </div>
          <p className="text">Session Length</p>
        </div>
      </div>
    </div>
  );
}
