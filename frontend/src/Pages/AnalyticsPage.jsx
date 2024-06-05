import React, { useState } from "react";
import UsageView from "@/pages/Usage.jsx";
import { DataTable } from "@/components/Custom/SessionTable.jsx";
import { NavigationBar } from "@/components/Custom/AnalyticsNavigation.jsx";
import { LineGraph } from "@/components/Custom/LineGraph";
import Insights from "./Insights";
import { ResponsiveContainer } from "recharts";
import SessionDetails from "@/pages/SessionDetails.jsx"; // Import the SessionDetails component
import { RemovedSessions } from "@/components/Custom/RemovedSessionsTable";
import RemovedSessionDetails from "./RemovedSessionDetails";

const SessionSummary = () => {
  const [selectedView, setSelectedView] = useState("DataTable");
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const handleSessionClick = (sessionId) => {
    setSelectedSessionId(sessionId);
    setSelectedView("SessionDetails");
  };
  const handleRemovedSessionClick = (sessionId) => {
    setSelectedSessionId(sessionId);
    setSelectedView("RemovedSessionDetails");
  };

  const renderSelectedView = () => {
    if (selectedView === "UsageView") {
      return <UsageView />;
    } else if (selectedView === "Insights") {
      return (
        <ResponsiveContainer>
          <Insights />
        </ResponsiveContainer>
      );
    } else if (selectedView === "SessionDetails" && selectedSessionId) {
      return <SessionDetails sessionId={selectedSessionId} />;
    } else if (selectedView === "RemovedSessions") {
      return <RemovedSessions onSessionClick={handleRemovedSessionClick} />;
    } else if (selectedView === "RemovedSessionDetails" && selectedSessionId) {
      return <RemovedSessionDetails sessionId={selectedSessionId} />;
    } else {
      return (
        <ResponsiveContainer>
          <div className="flex flex-col items-center justify-center space-y-8">
            <LineGraph />
            <DataTable onSessionClick={handleSessionClick} />
          </div>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 min-h-screen">
      <NavigationBar setSelectedView={setSelectedView} />
      {renderSelectedView()}
    </div>
  );
};

export default SessionSummary;
