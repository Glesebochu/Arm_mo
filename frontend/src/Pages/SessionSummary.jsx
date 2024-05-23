import * as React from "react";
import { useState } from "react";
import UsageView from "@/Pages/Usage.jsx";
import { DataTableDemo } from "@/components/Custom/SessionTable.jsx";
import { NavigationMenuDemo } from "@/components/Custom/AnalyticsNavigation.jsx";
import { LineGraph } from "@/components/Custom/LineGraph";

const SessionSummary = () => {
  const [selectedView, setSelectedView] = useState("DataTable");

  const renderSelectedView = () => {
    if (selectedView === "UsageView") {
      return <UsageView />;
    }
    return (
      <div className="flex flex-col items-center justify-center space-y-8">
        <LineGraph />
        <DataTableDemo />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <NavigationMenuDemo setSelectedView={setSelectedView} />
      {renderSelectedView()}
    </div>
  );
};

export default SessionSummary;
