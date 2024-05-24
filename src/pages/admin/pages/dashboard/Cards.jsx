import React from 'react'
import { IoPeopleOutline } from "react-icons/io5";
import { FaPersonBooth, FaRegBuilding } from "react-icons/fa";
import { LiaPersonBoothSolid } from "react-icons/lia";
import { MdOutlineEvent } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

export default function Cards({  
    ParticipantsTotal,
    CompanyTotal,
    BoothTotal,
    BoothAttendeeTotal,
    EventAttendeeTotal,
    EventTotal,
    InviteTotal
}) {
  return (
    <div className='cardContainer'>
        <div className="card">
            <span>
                <h3>Participant</h3>
                <IoPeopleOutline/>
            </span>
            <p>{ParticipantsTotal}</p>

        </div>

        <div className="card">
            <span>
                <h3>Booth Attendee</h3>
               <IoPeopleOutline/>
            </span>
            <p>{BoothAttendeeTotal}</p>
        </div>

        <div className="card">
            <span>
                <h3>Event Attendee</h3>
                 <IoPeopleOutline/>
            </span>
            <p>{EventAttendeeTotal}</p>
        </div>
       
        <div className="card">
            <span>
                <h3>Company</h3>
              <FaRegBuilding/>
            </span>
            <p>{CompanyTotal}</p>
        </div>
        <div className="card">
            <span>
                <h3>Booth</h3>
                <LiaPersonBoothSolid/>
            </span>
            <p>{BoothTotal}</p>
        </div>
        <div className="card">
            <span>
                <h3>Event</h3>
                 <MdOutlineEvent/>
            </span>
            <p>{EventTotal}</p>
        </div>

        <div className="card">
            <span>
                <h3>Invite</h3>
                 <AiOutlineMail/>
            </span>
            <p>{InviteTotal}</p>
        </div>

    </div>
  )
}
