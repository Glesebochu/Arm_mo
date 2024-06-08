import React, { useState, useEffect } from "react";
import BarGraph from "@/components/Custom/BarGraph";
import { CurrentStageAlert } from "@/components/Custom/CurrentStageAlert";
import { MostVisitedActivityAlert } from "@/components/Custom/FrequentedActivityAlert";
import LongestSession from "@/components/Custom/LongestSession";
import { ResponsiveContainer } from "recharts";
import SessionDetails from "@/pages/SessionDetails.jsx";
import "@/Styles/Insights.css";

const Insights = ({ onSessionClick }) => {
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedView, setSelectedView] = useState("Insights");

  useEffect(() => {
    if (selectedView === "Insights") {
      setSelectedSessionId(null);
    }
  }, [selectedView]);

  const handleSessionClick = (sessionId) => {
    setSelectedSessionId(sessionId);
    setSelectedView("SessionDetails");
  };

  const renderSelectedView = () => {
    if (selectedView === "SessionDetails" && selectedSessionId) {
      return <SessionDetails sessionId={selectedSessionId} />;
    } else {
      return (
        <div className="container-insight">
          <div className="bar-graph-box">
            <BarGraph meditatorId={1} />
          </div>

          <div className="alerts-box">
            <div className="alert-box">
              <CurrentStageAlert />
            </div>
            <div className="alert-box">
              <MostVisitedActivityAlert />
            </div>
          </div>

          <div className="longest-session-box">
            <LongestSession onSessionClick={handleSessionClick} />
          </div>
        </div>
      );
    }
  };

  return <>{renderSelectedView()}</>;
};

export default Insights;
