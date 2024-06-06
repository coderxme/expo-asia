/* eslint-disable react/prop-types */
import React from 'react';
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
    militaryBranchData,
    participantData
}) {
    
    // Filter militaryBranchData based on participantData.military_details.name and calculate totals
const militaryBranchTotals = militaryBranchData.map(branch => {
    const totalCount = participantData.filter(participant => participant.military_branch2_details && participant.military_branch2_details.desc === branch.desc).length;
    return { ...branch, totalCount };
});


const totalCountOther = participantData.filter(participant => participant.military_branch ).length;
const totalCountNA = participantData.filter(participant => 
    (!participant.military_branch2_details && !participant.military_branch)
).length;

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
                    <h3>Booth Attendance</h3>
                    <span>
                        <IoPeopleOutline className='icon2'/>
                        <p>{BoothAttendeeTotal}</p>
                    </span>
                </div>

                <div className="card">
                    <h3>Event Attendance</h3>
                    <span>
                        <IoPeopleOutline className='icon3'/>
                        <p>{EventAttendeeTotal}</p>
                    </span>
                </div>
            </div>

            <div className="flexCard">
                <div className="card">
                    <h3>Sponsor/Exhibitor</h3>
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

            {militaryBranchData.length === 0 ? (
                <div className="militaryCardWrapper">
                    <h3>Military Branch</h3>
                    <div className="militaryCardBox">
                     <h3>No Branch Available</h3>
                    </div>

                </div>
            ) : (
                <div className="militaryCardWrapper">
                    <h3>Military Branch</h3>
                    <div className="militaryCardBox">
                        {militaryBranchTotals.map(item => (
                            <div className='militaryCard' key={item.id}>
                                <span>
                                    <p>{item.abrv}</p>
                                    <small>{item.desc}</small>
                                </span>
                                <div className='militaryTotal'>{item.totalCount}</div>
                            </div>
                        ))}

                        <div className='militaryCard'>
                                <span>
                                    <p>Others</p>
                                </span>
                                <div className='militaryTotal'>{totalCountOther}</div>
                            </div>

                            <div className='militaryCard'>
                                <span>
                                    <p>Not Applicable</p>
                                </span>
                                <div className='militaryTotal'>{totalCountNA}</div>
                            </div>
                    </div>
                </div>
            )}


            <ChartComponent />
        </div>
    );
}
