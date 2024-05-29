import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import useAdminStore from '../../../../../store/adminStore';
import DonutChart from './DonutChart';
import LineChart from './LineChart';
// import PolarAreaChart from './PolarAreaChart';

export default function ChartComponent() {
  const { participantData } = useAdminStore();
  const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0]);


  console.log("data:", weeklyData)

  useEffect(() => {
    const processData = () => {
      const counts = [0, 0, 0, 0, 0, 0, 0]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]

      participantData.forEach((participant) => {
        const date = new Date(participant.created_at);
        const day = date.getDay(); // getDay() returns 0 for Sunday, 1 for Monday, etc.

        // Adjust array to start from Monday
        const adjustedDay = (day === 0) ? 6 : day - 1;

        counts[adjustedDay]++;
      });

      setWeeklyData(counts);
    };

    if (participantData.length > 0) {
      processData();
    }
  }, [participantData]);

  return (
    <div className="chartContainer">
      <BarChart data={weeklyData} />
      <LineChart data={weeklyData} />
      {/* <DonutChart data={weeklyData} /> */}
      {/* <PolarAreaChart data={weeklyData} /> */}
    </div>
  );
}
