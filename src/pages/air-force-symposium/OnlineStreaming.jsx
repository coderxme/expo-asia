import { GrNext } from "react-icons/gr";
import linestreamImage from '../../assets/livestream-image.png'
import CountDown from './CountDown'
import ScrollAnimation from 'react-animate-on-scroll';

export default function OnlineStreaming() {
  return (
    <div className="osContainer" id="online-streaming">
       <div className="osWrapper1">
      <ScrollAnimation animateIn="backInUp">
         <span>
          <h2>Watch the <br />
            Air Force Symposium Live</h2>
            <p>Join us for the Air Force Symposium, <br />
              streaming live on our Facebook page.</p>
            <a href="https://www.facebook.com/profile.php?id=100088332602409&mibextid=ZbWKwL" target="_blank" className="registerLink">
            Visit Expoasia Facebook Page <GrNext /> </a>
         </span>
         </ScrollAnimation>
       </div>
      <ScrollAnimation animateIn="backInUp">
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
