import React from 'react'
import { IoPeopleOutline } from "react-icons/io5";
import { FaPersonBooth, FaRegBuilding } from "react-icons/fa";
import { LiaPersonBoothSolid } from "react-icons/lia";
import { MdOutlineEvent } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import ChartComponent from './charts/ChartComponent2';

export default function Cards({  
    ParticipantsTotal,
    CompanyTotal,
    BoothTotal,
    BoothAttendeeTotal,
    EventAttendeeTotal,
    EventTotal,
    // InviteTotal
}) {
  return (
    <div className='cardContainer'>
        <div className="flexCard">
            <div className="card">
                <h3>Participant</h3>
                <span>
                    <IoPeopleOutline className='icon1'/>
                    <p>{ParticipantsTotal}</p>
                </span>
            </div>

        <div className="card">
        <h3>Booth Attendee</h3>
            <span>
               <IoPeopleOutline className='icon2'/>
                 <p>{BoothAttendeeTotal}</p>
            </span>
        </div>

        <div className="card">
        <h3>Event Attendee</h3>
            <span>
            <IoPeopleOutline className='icon3'/>
             <p>{EventAttendeeTotal}</p>
            </span>
        </div>
        </div>
       
        <div className="flexCard">
        <div className="card">
         <h3>Company</h3>
            <span>
              <FaRegBuilding className='icon4'/>
              <p>{CompanyTotal}</p>
            </span>
        </div>
        <div className="card">
           <h3>Booth</h3>
            <span>
            <LiaPersonBoothSolid className='icon5'/>
            <p>{BoothTotal}</p>
            </span>
        </div>
        <div className="card">
         <h3>Event</h3>
            <span>
                 <MdOutlineEvent className='icon6'/>
              <p>{EventTotal}</p>
            </span>
        </div>
        </div>

        {/* <div className="card">
            <span>
                <h3>Invite</h3>
                 <AiOutlineMail/>
            </span>
            <p>{InviteTotal}</p>
        </div> */}
        <ChartComponent />
    </div>
  )
}
