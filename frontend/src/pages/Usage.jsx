import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Usage.css";
import UsageGraph from "../components/Custom/UsageGraph";
import { useSelector } from "react-redux";
import TodayUsageBubble from "../components/Custom/TodayUsageBubble";

import {
  Chart,
  LinearScale,
  CategoryScale,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  LinearScale,
  LineController,
  CategoryScale,
  LineElement,
  PointElement
);

const UsageView = () => {
  const [chartData, setChartData] = useState(null);
  const [customStartDate, setCustomStartDate] = useState(null);
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    window.onunload = async () => {
      await endUsage();
    };
  });
  const endUsage = async () => {
    try {
      if (user) {
        fetchStartUsage(
          `http://localhost:5158/api/Analyzer/EndUsage?userId=${user.id}`
        );
      }
    } catch (error) {
      console.error("Error ending usage:", error);
    }
  };
  useEffect(() => {
    fetchUsageDataForPastWeek();
  }, []);

  useEffect(() => {
    if (customStartDate) {
      fetchUsageDataCustom(customStartDate);
    }
  }, [customStartDate]);

  const fetchUsageDataForPastWeek = async () => {
    document.getElementById("startDate").valueAsDate = new Date();
    try {
      const usageResponse = await axios.get(
        `http://localhost:5158/api/Analyzer/GetUsageDataForPastWeek?userId=${user.id}`,
        {
          withCredentials: true,
        }
      );
      const sessionResponse = await axios.get(
        `http://localhost:5158/api/Analyzer/GetSessionUsageCustom?userId=${user.id}`,
        {
          withCredentials: true,
        }
      );

      const usageData = usageResponse.data;
      var dataFirst = {
        label: "Daily App use",
        data: usageData[1].reverse(),
        borderWidth: 3,
        borderColor: "#2563eb",
        // lineTension: 0,
        // fill: false,
      };

      var dataSecond = {
        label: "Meditation sessions",
        data: sessionResponse.data.reverse(),
        borderWidth: 3,
        borderColor: "#006400",
      };

      //console.log(sessionResponse.data);
      var combinedLines = {
        labels: usageData[0].reverse(),
        datasets: [dataFirst, dataSecond],
      };

      dailyUse(usageData[1][6]);
      console.log(usageData[1][6]);
      setChartData(combinedLines);
    } catch (error) {
      console.error("Axios request failed:", error);
    }
  };

  const fetchUsageDataCustom = async (startDate) => {
    try {
      const usageResponse = await axios.get(
        `http://localhost:5158/api/Analyzer/GetUsageDataCustom?startDate=${startDate}&userId=${user.id}`,
        {
          withCredentials: true,
        }
      );
      const sessionResponse = await axios.get(
        `http://localhost:5158/api/Analyzer/GetSessionUsageCustom?customDate=${startDate}&userId=${user.id}`,
        {
          withCredentials: true,
        }
      );

      const usageData = usageResponse.data;
      var dataFirst = {
        label: "Daily App use",
        data: usageData[1].reverse(),
        borderWidth: 3,
        borderColor: "#2563eb",
        // lineTension: 0,
        // fill: false,
      };

      var dataSecond = {
        label: "Meditation sessions",
        data: sessionResponse.data.reverse(),
        borderWidth: 3,
        borderColor: "#006400",
      };

      //console.log(sessionResponse.data);
      var combinedLines = {
        labels: usageData[0].reverse(),
        datasets: [dataFirst, dataSecond],
      };

      setChartData(combinedLines);
    } catch (error) {
      console.error("Axios request failed:", error);
    }
  };

  useEffect(() => {
    if (chartData) {
      renderChart(chartData);
    }
  }, [chartData]);

  const renderChart = (data) => {
    const canvas = document.getElementById("weeklyUsage");
    const _labels = data[0];
    const _CharData = data[1];

    if (chartInstance) {
      chartInstance.destroy();
    }

    //console.log(data);

    var chartOptions = {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 80,
          fontColor: "black",
        },
      },
      animations: {
        radius: {
          duration: 500,
          easing: "easeInCirc",
          loop: (context) => context.active,
        },
        tension: {
          duration: 1000,
          easing: "linear",
          from: 0.55,
          to: 0.35,
          loop: true,
        },
      },
      hoverRadius: 12,
      hoverBackgroundColor: "red",
      interaction: {
        mode: "nearest",
        intersect: false,
        axis: "x",
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Minutes",
            font: {
              size: "10",
            },
          },
        },
      },
    };

    chartInstance = new Chart(canvas, {
      type: "line",
      data: data,
      options: chartOptions,
    });
  };
  const dailyUse = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = parseFloat((minutes % 60).toFixed(1));
    const formattedTime = `${hours}h ${remainingMinutes}m`;
    const timeDisplayElement = document.getElementById("timeBubble");
    timeDisplayElement.textContent = formattedTime;
  };

  return (
    <div className="container">
      <div className="chart-container">
        <h1 className="mb-4 text-1xl font-light leading-none tracking-tight text-black md:text-5xl lg:text-4xl dark:text-white">
          Your weekly Activity
        </h1>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            onChange={(e) => setCustomStartDate(e.target.value)}
            defaultValue={"Pick a Date"}
          />
        </div>
        <canvas
          id="weeklyUsage"
          className="small-chart"
          width="400"
          height="200"
        ></canvas>
        <TodayUsageBubble />
      </div>
    </div>
  );
};

export const fetchStartUsage = async (endpoint) => {
  try {
    const startTime = await axios.post(`${endpoint}`, null, {
      withCredentials: true,
    });
  } catch {}
};

var chartInstance;

export default UsageView;
