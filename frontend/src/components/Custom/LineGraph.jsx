import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler
);

export const LineGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Aha Moments per Session',
        data: [],
        fill: true,
        borderColor: '#2563eb',
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) {
            return;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(10, 24, 82, 0.1)');
          gradient.addColorStop(1, 'rgba(10, 24, 82, 0.4)');
          return gradient;
        },
        tension: 0.4 // Add this line to smooth the edges
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5158/api/Analyzer/GetSessionsForMeditator?meditatorId=1");
        if (response.status === 200) {
          const sessionIds = response.data.map(session => session.id.toString());
          const ahaMoments = response.data.map(session => session.ahaMoments.length);
          setChartData({
            labels: sessionIds,
            datasets: [{
              label: 'Aha Moments per Session',
              data: ahaMoments,
              fill: true,
              borderColor: '#2563eb',
              tension: 0.2 // Add this line to smooth the edges
            }]
          });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Aha Moments',
          font: {
            size: 16
          }
        },
        ticks: {
          precision: 0  // Ensures no floating point numbers
        }
      },
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Session ID',
          font: {
            size: 16
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Session Analysis',
        font: {
          size: 24
        }
      }
    },
    interaction: {
      intersect: true,
      mode: 'nearest'
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={{ width: '100%', height: '500px', margin: '0 auto', padding: '0 0%' }}>
      <Line options={options} data={chartData} />
    </div>
  );
};
