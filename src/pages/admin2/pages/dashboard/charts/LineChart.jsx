import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  const chartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Registered participant base on the day',
        data: data,
        backgroundColor: [
          '#4ade80',
          '#fbbf24',
          '#2dd4bf',
          '#3b82f6',
          '#6366f1',
          '#A1DD70',
          '#BFF6C3',
        ],
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="lineChartBox">
         <Line className='lineChart' data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
