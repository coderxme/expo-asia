import React from 'react';
import { IoPeopleOutline } from "react-icons/io5";
import { LiaPersonBoothSolid } from "react-icons/lia";


export default function Cards({  
    BoothTotal,
    BoothAttendeeTotal,
}) {
    
    return (
        <div className='cardContainer'>
            <div className="flexCard">
            <div className="flexCard">
                {/* <div className="card">
                    <h3>Booth</h3>
                    <span>
                        <LiaPersonBoothSolid className='icon5'/>
                        <p>{BoothTotal}</p>
                    </span>
                </div> */}
                <div className="card">
                    <h3>Booth Attendance</h3>
                    <span>
                        <IoPeopleOutline className='icon2'/>
                        <p>{BoothAttendeeTotal}</p>
                    </span>
                </div>
            </div>
        </div>
    </div>
    );
}
