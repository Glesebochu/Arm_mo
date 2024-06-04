import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Usage.css";
import UsageGraph from "../components/Custom/UsageGraph";
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

  useEffect(() => {
    fetchUsageDataForPastWeek();
  }, []);

  useEffect(() => {
    if (customStartDate) {
      fetchUsageDataCustom(customStartDate);
    }
  }, [customStartDate]);

  const fetchUsageDataForPastWeek = async () => {
    try {
      const usageResponse = await axios.get(
        "http://localhost:5158/api/Analyzer/GetUsageDataForPastWeek"
      );
      const sessionResponse = await axios.get(
        "http://localhost:5158/api/Analyzer/GetSessionUsageCustom"
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
        borderColor: "red",
      };

      //console.log(sessionResponse.data);
      var combinedLines = {
        labels: usageData[0].reverse(),
        datasets: [dataFirst, dataSecond],
      };

      dailyUse(usageData[1][0]);
      setChartData(combinedLines);
    } catch (error) {
      console.error("AJAX request failed:", error);
    }
  };

  const fetchUsageDataCustom = async (startDate) => {
    try {
      const usageResponse = await axios.get(
        `http://localhost:5158/api/Analyzer/GetUsageDataCustom?startDate=${startDate}`
      );
      const sessionResponse = await axios.get(
        `http://localhost:5158/api/Analyzer/GetSessionUsageCustom?customDate=${startDate}`
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
        borderColor: "red",
      };

      //console.log(sessionResponse.data);
      var combinedLines = {
        labels: usageData[0].reverse(),
        datasets: [dataFirst, dataSecond],
      };

      setChartData(combinedLines);
    } catch (error) {
      console.error("AJAX request failed:", error);
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

    console.log(data);

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
          duration: 500,
          easing: "linear",
          from: 0.5,
          to: 0.3,
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
    const remainingMinutes = minutes % 60;
    const formattedTime = `${hours}h ${remainingMinutes}m`;
    const timeDisplayElement = document.getElementById("time");
    timeDisplayElement.textContent = formattedTime;
  };

  return (
    <div className="container">
      <div className="chart-container">
        <h1 className="mb-4 text-1xl font-light leading-none tracking-tight text-black md:text-5xl lg:text-4xl dark:text-white">
          Your weekly Activity
        </h1>
        <UsageGraph />
        <TodayUsageBubble />
      </div>
    </div>
  );
};

var chartInstance;

export default UsageView;