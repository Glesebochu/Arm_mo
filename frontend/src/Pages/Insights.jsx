import * as React from "react";
import BarGraph from "@/components/Custom/BarGraph";
import { DataTableDemo } from "@/components/Custom/SessionTable";
import { ResponsiveContainer } from "recharts";
import { CurrentStageAlert } from "@/components/Custom/CurrentStageAlert";
import { LineGraph } from "@/components/Custom/LineGraph";
import "@/Styles/Insights.css"

const Insights = () => {
  return (
    <div className="containerInsight">
      <ResponsiveContainer className={"box box1"}>
        <CurrentStageAlert />
      </ResponsiveContainer>
      <ResponsiveContainer className={"box box2"}>
        <BarGraph meditatorId={1} />
      </ResponsiveContainer>
    </div>
  );
};

export default Insights;
