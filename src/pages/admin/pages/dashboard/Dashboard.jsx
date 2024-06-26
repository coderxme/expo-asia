import Cards from "./Cards"
import "./Dashboard.css"
import useAdminStore from "../../../../store/adminStore";
import ChartComponent from "./charts/ChartComponent";


export default function Dashboard() {
  const { 
    participantData,
    companyData, 
    boothData,
    boothAttendeeData,
    eventData,
    eventAttendeeData,
    inviteData,
    militaryBranchData,
   } = useAdminStore();


  const ParticipantsTotal = participantData.length;
  const CompanyTotal = companyData.length;
  const BoothTotal = boothData.length;
  const BoothAttendeeTotal = boothAttendeeData.length;
  const EventTotal = eventData.length;
  const EventAttendeeTotal = eventAttendeeData.length;
  const InviteTotal = inviteData.length;

  return (
    <div className="dashboardContainer">
       <div className="dashboardHeader">
           <h1 className="dashboardTitle">Expo Asia Dashboard</h1>
       </div>

       <div className="dashboardContent">
          <Cards 
            ParticipantsTotal={ParticipantsTotal}
            CompanyTotal={CompanyTotal}
            BoothTotal={BoothTotal}
            BoothAttendeeTotal={BoothAttendeeTotal}
            EventAttendeeTotal={EventAttendeeTotal}
            EventTotal={EventTotal}
            InviteTotal={InviteTotal}
            militaryBranchData={militaryBranchData}
            participantData={participantData}
          />

          <ChartComponent />
       </div>
    </div>
  )
}
