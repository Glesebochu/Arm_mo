import React from "react";
import "../../Styles/Usage.css";

export default function TodayUsageBubble() {
  return (
    <div className="circle-container">
      <div className="circle">
        <div className="circle-content">
          <div id="loader">
            <div>
              <div id="box"></div>
              <div id="hill"></div>
            </div>
            <div className="timeContainer">
              <p id="timeBubble">1h 35m</p>
            </div>
          </div>
          <p className="textBubble">Today's Activity</p>
        </div>
      </div>
    </div>
  );
}
