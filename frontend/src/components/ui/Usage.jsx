import React from "react";
import "../../Styles/Usage.css";
import $ from "jquery";

const UsageView = () => {
  return (
    <div className="container">
      <div className="chart-container">
        <h1 className="mb-4 text-3xl font-light leading-none tracking-tight text-black md:text-5xl lg:text-6xl dark:text-white">
          Your weekly Activity
        </h1>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
          />
        </div>
        <canvas
          id="weeklyUsage"
          className="small-chart"
          width="400"
          height="200"
        ></canvas>

        <div className="circle-container">
          <div className="circle">
            <div className="circle-content">
              <div id="loader">
                <div>
                  <div id="box"></div>
                  <div id="hill"></div>
                </div>
                <div className="timeContainer">
                  <p id="time">1h 35m</p>
                </div>
              </div>
              <p className="text">Today's Activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
var chartInstance;

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/Analyzer/GetUsageDataForPastWeek",
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
      url: "/api/Analyzer/GetUsageDataCustom?startDate=" + startDate,
      data: "",
      contentType: "application/json; charset=utf8",
      dataType: "json",
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
    url: "/api/Analyzer/GetUsageDataForPastWeek",
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
