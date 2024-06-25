// BarGraph.jsx
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarGraph = ({ meditatorId, onDataCheck }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [containerHeight, setContainerHeight] = useState(400); // Default height
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/analyzer/GetPracticedStagesForMeditator?meditatorId=${meditatorId}`,
          {
            withCredentials: true,
          }
        );
        let practicedStages = response.data.practicedStages;

        if (practicedStages.length > 0) {
          setHasData(true);
          onDataCheck(true);
        } else {
          onDataCheck(false);
        }

        // Count the occurrences of each stageId
        const stageCounts = practicedStages.reduce((acc, stage) => {
          acc[stage.stageId] = (acc[stage.stageId] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(stageCounts).map((key) => `Stage ${key}`);
        const counts = Object.values(stageCounts);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Count",
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

        // Set container height based on the number of data points
        setContainerHeight(labels.length * 50); // Adjust 50 as needed
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [meditatorId, onDataCheck]);

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
          bottom: 40, // Adjusted padding to ensure x-axis label is visible
          left: 20,
        },
      },
    },
  };

  return (
    <div className={`bar-graph-container ${!hasData ? "hidden" : ""}`}>
      <h1 className="mb-4 mt-4 text-1xl text-center font-light leading-none tracking-tight text-black md:text-5xl lg:text-4xl dark:text-white">
        Stages you've practiced
      </h1>
      <div
        style={{
          width: "100%",
          height: `${containerHeight + containerHeight * 1.2}px`,
        }}
      >
        <Bar data={chartData} options={config.options} />
      </div>
    </div>
  );
};

export default BarGraph;
