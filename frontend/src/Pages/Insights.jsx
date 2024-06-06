import * as React from "react";
import BarGraph from "@/components/Custom/BarGraph";
import { DataTable } from "@/components/Custom/SessionTable";
import { ResponsiveContainer } from "recharts";
import { CurrentStageAlert } from "@/components/Custom/CurrentStageAlert";
import { MostVisitedActivityAlert } from "@/components/Custom/FrequentedActivityAlert";
import { LineGraph } from "@/components/Custom/LineGraph";
import LongestSession from "@/components/Custom/LongestSession";
import "@/Styles/Insights.css";

const Insights = () => {
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
        <LongestSession />
      </div>
    </div>
  );
};

export default Insights;
