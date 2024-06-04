import * as React from "react";
import BarGraph from "@/components/Custom/BarGraph";
import { DataTableDemo } from "@/components/Custom/SessionTable";
import { ResponsiveContainer } from "recharts";
import { CurrentStageAlert } from "@/components/Custom/CurrentStageAlert";
import { LineGraph } from "@/components/Custom/LineGraph";
import LongestSession from "@/components/Custom/LongestSession";
import "@/Styles/Insights.css";

const Insights = () => {
  return (
    <div className="containerInsight">
      <div className="box box2">
        <BarGraph meditatorId={1} />
      </div>

      <div className="box box2">
        <div className="box box1">
          <CurrentStageAlert />
        </div>
        <LongestSession />
      </div>
    </div>
  );
};

export default Insights;
