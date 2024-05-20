import { GrNext } from "react-icons/gr";
import {  Link } from 'react-router-dom'
import linestreamImage from '../../assets/livestream-image.png'
import CountDown from './CountDown'
import ScrollAnimation from 'react-animate-on-scroll';

export default function OnlineStreaming() {
  return (
    <div className="osContainer" id="online-streaming">
       <div className="osWrapper1">
      <ScrollAnimation animateIn="swing">
         <span>
          <h2>Watch the <br />
            Air Force Symposium Live</h2>
            <p>Access to live stream is restricted. <br />
              Please register to watch the event.</p>
            <Link onClick={() => { window.scroll(0, 0) }} to={"/"} className="registerLink">Register for access <GrNext /> </Link>
         </span>
         </ScrollAnimation>
       </div>
      <ScrollAnimation animateIn="bounceIn">
       <div className="osWrapper2">
         <img src={linestreamImage} alt="" />
         <div className="absolute flex flex-col items-start">
          <p className="-mb-6 font-opensans text-sm">Live Stream starts in:</p>
             <CountDown />
         </div>
       </div>
       </ScrollAnimation>
    </div>
  )
}
