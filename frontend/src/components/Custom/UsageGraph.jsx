import React from "react";
import "../../Styles/Usage.css";

export default function UsageGraph() {
  return (
    <>
      <div className="form-group">
        <input
          type="date"
          className="form-control"
          id="startDate"
          name="startDate"
          onChange={(e) => setCustomStartDate(e.target.value)}
        />
      </div>
      <canvas
        id="weeklyUsage"
        className="small-chart"
        width="400"
        height="200"
      ></canvas>
    </>
  );
}
