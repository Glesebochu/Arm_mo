import * as React from "react";
import { useState } from "react";
import UsageView from "@/components/ui/Usage.jsx";
import { DataTableDemo } from "@/components/Custom/SessionTable.jsx";
import { NavigationMenuDemo } from "@/components/Custom/AnalyticsNavigation.jsx";

const SessionSummary = () => {
  const [selectedView, setSelectedView] = useState("DataTable");

  const renderSelectedView = () => {
    switch (selectedView) {
      case "UsageView":
        return <UsageView />;
      case "DataTable":
      default:
        return <DataTableDemo />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  space-y-8">
      <NavigationMenuDemo setSelectedView={setSelectedView} />
      {renderSelectedView()}
    </div>
  );
};

export default SessionSummary;
