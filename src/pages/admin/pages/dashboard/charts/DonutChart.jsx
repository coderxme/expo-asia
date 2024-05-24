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
          '#006769',
          '#40A578',
          '#9DDE8B',
          '#E6FF94',
          '#799351',
          '#A1DD70',
          '#BFF6C3',
        ],
      
      },
    ],
  };

  return (
    <div className="donutChartBox">
        <Doughnut data={chartData} />
    </div>
  );
};

export default DonutChart;
