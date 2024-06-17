import React, { useState, useEffect } from "react";
import BarGraph from "@/components/Custom/BarGraph";
import { CurrentStageAlert } from "@/components/Custom/CurrentStageAlert";
import { MostVisitedActivityAlert } from "@/components/Custom/FrequentedActivityAlert";
import LongestSession from "@/components/Custom/LongestSession";
import { ActivityAhaMomentDonut } from "@/components/Custom/ActivityAhaMoments";
import { useSelector } from "react-redux";
import SessionDetails from "@/pages/SessionDetails.jsx";
import { Button } from "@/components/ui/button";
import "@/Styles/Insights.css";

const Insights = ({ onSessionClick }) => {
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedView, setSelectedView] = useState("Insights");
  const [hasBarGraphData, setHasBarGraphData] = useState(true);
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    if (selectedView === "Insights") {
      setSelectedSessionId(null);
    }
  }, [selectedView]);

  const handleSessionClick = (sessionId) => {
    setSelectedSessionId(sessionId);
    setSelectedView("SessionDetails");
  };

  const handleDataCheck = (hasData) => {
    setHasBarGraphData(hasData);
  };

  const renderSelectedView = () => {
    if (selectedView === "SessionDetails" && selectedSessionId) {
      return <SessionDetails sessionId={selectedSessionId} />;
    } else {
      if (!hasBarGraphData) {
        return (
          <div className="no-data-image">
            <img src="public/InsightsNotFound.jpg" alt="Insights Not Found" />
            <Button className="MeditateButton">Meditate</Button>
          </div>
        );
      }
      return (
        <div className="container-insight">
          <div className="bar-graph-box">
            <BarGraph meditatorId={user.id} onDataCheck={handleDataCheck} />
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
          <div className="Activities">
            <ActivityAhaMomentDonut />
          </div>
        </div>
      );
    }
  };

  return <>{renderSelectedView()}</>;
};

export default Insights;
