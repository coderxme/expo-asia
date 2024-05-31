import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = ({ data }) => {
  const chartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Registered Participant',
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
      
      },
    ],
  };

  const options = {
    scales: {
      r: {
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
    <div className="polarChartBox">
      <PolarArea className='p-5' data={chartData} options={options} />
    </div>
  );
};

export default PolarAreaChart;
