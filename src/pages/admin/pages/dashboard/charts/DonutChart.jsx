import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data }) => {
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
    plugins: {
      legend: {
        // labels: {
        //   color: 'white'  // Set the label text color to white
        // },
      },
      tooltip: {
        bodyColor: 'white',  // Set the tooltip text color to white
        titleColor: 'white'  // Set the tooltip title color to white
      },
    },
  };

  return (
    <div className="donutChartBox">
        <Doughnut className='p-5' data={chartData} options={options}/>
    </div>
  );
};

export default DonutChart;
