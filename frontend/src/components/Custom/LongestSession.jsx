import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function LongestSession({ onSessionClick }) {
  const [duration, setDuration] = useState("NaN");
  const [sessionId, setSessionId] = useState(null);
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    const fetchLongestSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5158/api/analyzer/GetLongestSessionForMeditator",
          {
            withCredentials: true,
            params: { meditatorId: user.id },
          }
        );

        if (response.status === 200 && response.data) {
          const { id, startDateTime, endDateTime } = response.data;
          if (id && startDateTime && endDateTime) {
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
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchLongestSession();
  }, [user.id]);

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
          <p className="textLongest">Your Longest Session</p>
        </div>
      </div>
    </div>
  );
}
