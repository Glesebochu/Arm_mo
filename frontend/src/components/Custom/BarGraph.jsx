import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { ResponsiveContainer } from "recharts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarGraph = ({ meditatorId }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/analyzer/GetPracticedStagesForMeditator?meditatorId=${meditatorId}`
        );
        const practicedStages = response.data[0].practicedStages;

        // Count the occurrences of each stageId
        const stageCounts = practicedStages.reduce((acc, stage) => {
          acc[stage.stageId] = (acc[stage.stageId] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(stageCounts);
        const counts = Object.values(stageCounts);

        setChartData({
          labels: labels,
          datasets: [
            {
              data: counts,
              borderColor: "#2563eb",
              backgroundColor: "#2563eb",
              borderWidth: 1,
              barThickness: 65,
              borderRadius: 5,
              hoverBackgroundColor: "black",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [meditatorId]);

  const config = {
    type: "bar",
    data: chartData,
    options: {
      indexAxis: "y",
      elements: {
        bar: {
          borderWidth: 1,
          borderRadius: 5,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.7)",
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: "Count",
            font: {
              size: 12,
            },
          },
          ticks: {
            font: {
              size: 10,
            },
          },
        },
        y: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: "Stage",
            font: {
              size: 12,
            },
          },
          ticks: {
            font: {
              size: 10,
            },
          },
        },
      },
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "50%",
        height: "430px",
        margin: 0,
        padding: 0,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "white",
        padding: "10px",
      }}
    >
      <h1 className="mb-4 text-center text-1xl font-light leading-none tracking-tight text-black md:text-5xl lg:text-4xl dark:text-white">
        Stages you practiced
      </h1>
      <ResponsiveContainer>
        <Bar data={chartData} options={config.options} />
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;