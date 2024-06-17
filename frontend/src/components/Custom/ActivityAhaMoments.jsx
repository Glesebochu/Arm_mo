import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
  "#1E3A8A",// blue-900
  "#1E3A8A", // blue-700
  "#2563EB", // blue-600
  "#3B82F6", // blue-500
  "#60A5FA", // blue-400
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

        // Sort data by Aha Moment count in descending order
        data.sort((a, b) => b.ahaMomentCount - a.ahaMomentCount);

        let labels = data.map((item) => item.activity);
        let ahaMomentCounts = data.map((item) => item.ahaMomentCount);

        // Check if activities exceed 5
        if (labels.length > 5) {
          const otherCount = ahaMomentCounts
            .slice(4)
            .reduce((acc, val) => acc + val, 0);
          labels = labels.slice(0, 4).concat("Other");
          ahaMomentCounts = ahaMomentCounts.slice(0, 4).concat(otherCount);
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
    },
  };

  return (
    <div>
      {chartData ? (
        <Doughnut data={chartData} options={config.options} />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
