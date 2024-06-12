// src/components/Custom/ActivityAhaMoments.jsx

import React from "react";
import { DonutChart } from "@tremor/react";

const sales = [
  {
    name: "New York",
    sales: 980,
  },
  {
    name: "London",
    sales: 456,
  },
  {
    name: "Hong Kong",
    sales: 390,
  },
  {
    name: "San Francisco",
    sales: 240,
  },
  {
    name: "Singapore",
    sales: 190,
  },
  {
    name: "Zurich",
    sales: 139,
  },
];

export function DonutChartUsageExampleWithCustomColors() {
  return (
    <DonutChart
      data={sales}
      category="sales"
      index="name"
      colors={[
        "blue-900",
        "blue-800",
        "blue-700",
        "blue-600",
        "blue-500",
        "blue-400",
      ]}
    />
  );
}
