import React, { useEffect, useState } from "react";
import axios from "axios";
import "@/Styles/LongestSession.css";

export default function LongestSession() {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const fetchLongestSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5158/api/analyzer/GetLongestSessionForMeditator",
          { params: { meditatorId: 1 } }
        );

        if (response.status === 200 && response.data) {
          const { startTime, endTime } = response.data;
          const start = new Date(startTime);
          const end = new Date(endTime);
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

    fetchLongestSession();
  }, []);

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
          <p className="text">Your Longest Session</p>
        </div>
      </div>
    </div>
  );
}
