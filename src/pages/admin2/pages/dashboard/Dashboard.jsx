import Cards from "./Cards"
import "./Dashboard.css"
import useAdminStore from "../../../../store/adminStore";
// import ChartComponent from "./charts/ChartComponent";


export default function Dashboard() {
  const { 
    boothData,
    boothAttendeeData,
   } = useAdminStore();

  const BoothTotal = boothData.length;
  const BoothAttendeeTotal = boothAttendeeData.length;


  return (
    <div className="dashboardContainer">
       <div className="dashboardHeader">
           <h1 className="dashboardTitle">Dashboard</h1>
       </div>

       <div className="dashboardContent">
          <Cards 
            BoothTotal={BoothTotal}
            BoothAttendeeTotal={BoothAttendeeTotal}
            
          />

          {/* <ChartComponent /> */}
       </div>
    </div>
  )
}
