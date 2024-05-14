import { GrNext } from "react-icons/gr";
import {  Link } from 'react-router-dom'
import linestreamImage from '../../assets/livestream-image.svg'
import CountDown from './CountDown'

export default function OnlineStreaming() {
  return (
    <div className="osContainer" id="online-streaming">
       <div className="osWrapper1">
         <span>
          <h2>Watch the <br />
            Air Force Symposium Live</h2>
            <p>Access to live stream is restricted. <br />
              Please register to watch the event.</p>
            <Link onClick={() => { window.scroll(0, 0) }} to={"/expo-asia/home"} className="registerLink">Register for access <GrNext /> </Link>
         </span>
       </div>
       <div className="osWrapper2">
         <img src={linestreamImage} alt="" />
         <div className="absolute flex flex-col items-start">
          <p className="-mb-6 font-opensans text-sm">Live Stream starts in:</p>
             <CountDown />
         </div>
       </div>
    </div>
  )
}
