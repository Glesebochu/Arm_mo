import * as React from "react";
import { useState } from "react";
import UsageView from "@/Pages/Usage.jsx";
import { DataTableDemo } from "@/components/Custom/SessionTable.jsx";
import { NavigationMenuDemo } from "@/components/Custom/AnalyticsNavigation.jsx";
import { LineGraph } from "@/components/Custom/LineGraph";
import Insights from "./Insights";
import { ResponsiveContainer } from "recharts";

const SessionSummary = () => {
  const [selectedView, setSelectedView] = useState("DataTable");

  const renderSelectedView = () => {
    if (selectedView === "UsageView") {
      return <UsageView />;
    } else if (selectedView === "Insights") {
      return <Insights />;
    }
    return (
      <ResponsiveContainer>
        <div className="flex flex-col items-center justify-center space-y-8">
          <LineGraph />
          <DataTableDemo />
        </div>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 min-h-screen">
      <NavigationMenuDemo setSelectedView={setSelectedView} />
      {renderSelectedView()}
    </div>
  );
};

export default SessionSummary;
