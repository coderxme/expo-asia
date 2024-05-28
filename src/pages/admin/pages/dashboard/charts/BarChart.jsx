import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
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
        // labels: {
        //   color: 'white',  // Set the legend label text color to white
        // },
      },
      tooltip: {
        bodyColor: 'white',  // Set the tooltip text color to white
        titleColor: 'white'  // Set the tooltip title color to white
      },
    },
  };

  

  return (
    <div className="barChartBox">
         <Bar className='barChart' data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
