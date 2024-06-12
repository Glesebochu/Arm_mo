import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const data = {
  labels: [
    "New York",
    "London",
    "Hong Kong",
    "San Francisco",
    "Singapore",
    "Zurich",
  ],
  datasets: [
    {
      label: "Sales",
      data: [980, 456, 390, 240, 190, 139],
      backgroundColor: [
        "#1E3A8A", // blue-900
        "#1E40AF", // blue-800
        "#1E3A8A", // blue-700
        "#2563EB", // blue-600
        "#3B82F6", // blue-500
        "#60A5FA", // blue-400
      ],
    },
  ],
};

const config = {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales by City",
      },
    },
  },
};

export function ActivityAhaMomentDonut() {
  return (
    <div>
      <Doughnut data={data} option={config}></Doughnut>
    </div>
  );
}
