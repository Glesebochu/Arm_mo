import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
  "#101A8B", // blue-900
  "#1E3A8A", // blue-700
  "#2563EB", // blue-600
  "#3B82F6", // blue-500
  "#60A5FA", // blue-400
  "#93C5FD", // blue-300
  "#BFDBFE", // blue-200
  "#DBEAFE", // blue-100
  "black", // black
];

export function ActivityAhaMomentDonut() {
  const [chartData, setChartData] = useState(null);
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/Analyzer/GetActivitesWithTheirAhaMoments?meditatorId=${user.id}`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        // Dummy data for testing purposes
        // const data = [
        //   { activity: "Activity 1", ahaMomentCount: 100 },
        //   { activity: "Activity 2", ahaMomentCount: 90 },
        //   { activity: "Activity 3", ahaMomentCount: 80 },
        //   { activity: "Activity 4", ahaMomentCount: 70 },
        //   { activity: "Activity 5", ahaMomentCount: 60 },
        //   { activity: "Activity 6", ahaMomentCount: 50 },
        //   { activity: "Activity 7", ahaMomentCount: 40 },
        //   { activity: "Activity 8", ahaMomentCount: 30 },
        //   { activity: "Activity 9", ahaMomentCount: 20 },
        //   { activity: "Activity 10", ahaMomentCount: 10 },
        //   { activity: "Activity 11", ahaMomentCount: 10 },
        //   { activity: "Activity 12", ahaMomentCount: 10 },
        // ];

        // Sort data by Aha Moment count in descending order
        data.sort((a, b) => b.ahaMomentCount - a.ahaMomentCount);

        let labels = data.map((item) => item.activity);
        let ahaMomentCounts = data.map((item) => item.ahaMomentCount);

        // Check if activities exceed 8
        if (labels.length > 8) {
          const otherCount = ahaMomentCounts
            .slice(8)
            .reduce((acc, val) => acc + val, 0);
          labels = labels.slice(0, 8).concat("Other");
          ahaMomentCounts = ahaMomentCounts.slice(0, 8).concat(otherCount);
        }

        const backgroundColors = colors.slice(0, labels.length);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: "Aha Moments",
              data: ahaMomentCounts,
              backgroundColor: backgroundColors,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [user.id]);

  const sumAhaMoments =
    chartData?.datasets[0].data.reduce((a, b) => a + b, 0) || 0;

  const config = {
    type: "doughnut",
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Aha Moments by Activity",
        },
      },
      cutout: "60%", // Adjust the cutout percentage to create space in the middle
      animation: {
        animateRotate: true,
        animateScale: true,
      },
      layout: {
        padding: {
          top: 20,
          bottom: 20,
        },
      },
    },
    plugins: [
      {
        afterDraw: (chart) => {
          const ctx = chart.ctx;
          ctx.save();
          const centerX = chart.getDatasetMeta(0).data[0].x;
          const centerY = chart.getDatasetMeta(0).data[0].y;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "bold 24px sans-serif";
          ctx.fillText(sumAhaMoments, centerX, centerY);
          ctx.restore();
        },
      },
    ],
  };

  return (
    <div>
      {chartData ? (
        <Doughnut
          data={chartData}
          options={config.options}
          plugins={config.plugins}
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
