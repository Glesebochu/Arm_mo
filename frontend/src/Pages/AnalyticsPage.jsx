import React, { useState } from "react";
import UsageView from "@/Pages/Usage.jsx";
import { DataTableDemo } from "@/components/Custom/SessionTable.jsx";
import { NavigationMenuDemo } from "@/components/Custom/AnalyticsNavigation.jsx";
import { LineGraph } from "@/components/Custom/LineGraph";
import Insights from "./Insights";
import { ResponsiveContainer } from "recharts";
import SessionDetails from "@/Pages/SessionDetails.jsx";  // Import the SessionDetails component

const SessionSummary = () => {
  const [selectedView, setSelectedView] = useState("DataTable");
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const handleSessionClick = (sessionId) => {
    setSelectedSessionId(sessionId);
    setSelectedView("SessionDetails");
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
    } else {
      return (
        <ResponsiveContainer>
          <div className="flex flex-col items-center justify-center space-y-8">
            <LineGraph />
            <DataTableDemo onSessionClick={handleSessionClick} />
          </div>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 min-h-screen">
      <NavigationMenuDemo setSelectedView={setSelectedView} />
      {renderSelectedView()}
    </div>
  );
};

export default SessionSummary;
