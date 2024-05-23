import React from "react";
import "../Styles/Usage.css";
import $ from "jquery";
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
      const response = await axios.get(
        "http://localhost:5158/api/Analyzer/api/Analyzer/GetUsageDataForPastWeek"
      );
      const data = response.data;
      const _CharData = data[1].reverse();
      dailyUse(_CharData[_CharData.length - 1]);
      setChartData(data);
    } catch (error) {
      console.log("AJAX request failed: ", error);
    }
  };

  const fetchUsageDataCustom = async (startDate) => {
    try {
      const response = await axios.get(
        `http://localhost:5158/api/Analyzer/api/Analyzer/GetUsageDataCustom?startDate=${startDate}`
      );
      const data = response.data;
      setChartData(data);
    } catch (error) {
      console.log("AJAX request failed: ", error);
    }
  };

  useEffect(() => {
    if (chartData) {
      renderChart(chartData);
    }
  }, [chartData]);

  const renderChart = (data) => {
    const canvas = document.getElementById("weeklyUsage");
    const _labels = data[0].reverse();
    const _CharData = data[1].reverse();

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(canvas, {
      type: "line",
      data: {
        labels: _labels,
        datasets: [
          {
            label: "Daily use",
            data: _CharData,
            borderWidth: 3,
          },
        ],
      },
      options: {
        animations: {
          radius: {
            duration: 500,
            easing: "easeInCirc",
            loop: (context) => context.active,
          },
          tension: {
            duration: 1000,
            easing: "linear",
            from: 0.5,
            to: 0,
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
      },
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

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://localhost:5158/api/Analyzer/api/Analyzer/GetUsageDataForPastWeek",
    data: "",
    contextType: "application/json; charset=utf8",
    dataType: "json",
    success: OnSuccess,
    error: function (xhr, status, error) {
      // Handle the error here
      console.log("AJAX request failed: " + status + ", " + error);
    },
  });
});

$(document).ready(function () {
  $("#startDate").change(function () {
    var startDate = $(this).val();
    $.ajax({
      type: "GET",
      url:
        "http://localhost:5158/api/Analyzer/api/Analyzer/GetUsageDataCustom?startDate=" +
        startDate,
      data: "",
      contextType: "application/json; charset=utf8",
      //dataType: "json",
      success: OnSuccess,
      error: function (xhr, status, error) {
        // Handle the error here
        console.log("AJAX request failed: " + status + ", " + error);
      },
    });
  });
});

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://localhost:5158/api/Analyzer/api/Analyzer/GetUsageDataForPastWeek",
    data: "",

    contentType: "application/json; charset=utf8",
    dataType: "json",
    success: function (data) {
      var _CharData = data[1].reverse();
      dailyUse(_CharData[_CharData.length - 1]);
    },
    error: function (xhr, status, error) {
      // Handle the error here
      console.log("AJAX request failed: " + status + ", " + error);
    },
  });
});

function OnSuccess(data) {
  const canvas = document.getElementById("weeklyUsage");
  var _data = data;
  var _labels = _data[0].reverse();
  var _CharData = _data[1].reverse();

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvas, {
    type: "line",
    data: {
      labels: _labels,
      datasets: [
        {
          label: "Daily use",
          data: _CharData,
          borderWidth: 3,
          borderColor: "rgb(75, 192, 192)",
        },
      ],
    },
    options: {
      animations: {
        radius: {
          duration: 500,
          easing: "easeInCirc",
          loop: (context) => context.active,
        },
        tension: {
          duration: 1000,
          easing: "linear",
          from: 0.5,
          to: 0,
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
    },
  });
}

function dailyUse(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedTime = `${hours}h ${remainingMinutes}m`;

  const timeDisplayElement = document.getElementById("time");

  timeDisplayElement.textContent = formattedTime;
}
export default UsageView;
