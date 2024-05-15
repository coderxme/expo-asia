import { Image } from "antd"
import image1 from '../../assets/home/image1.svg'
import image2 from '../../assets/home/image2.svg'
import image3 from '../../assets/home/image3.svg'
import dot from '../../assets/dot.svg'
import waveL from '../../assets/waves-l.svg'
import waveR from '../../assets/waves-r.svg'
import ScrollAnimation from 'react-animate-on-scroll';

export default function Details() {
  return (
    <div className="homeContext2">
        <div className="homeContext2Header">
        <ScrollAnimation animateIn="fadeInRightBig">
           <h2 className="">Overview</h2>
        </ScrollAnimation>

        <ScrollAnimation animateIn="bounceInLeft">
           <p>As part of the 77th Philippine Air Force Pre-Anniversary activity, 
            we are holding the <b>Air Force Symposium & Expo</b> on <b>June 13-14, 2024</b> at
            the <b>Marriott Grand Ballroom Manila.</b> <br /> The event is a dynamic exchange
            of knowledge as we see the latest advancements and discuss the most 
            pressing issues in aero defense and security.</p>
         </ScrollAnimation>
        </div>

        <div className="homeContext2Box1">
          <ScrollAnimation animateIn="bounceIn">
             <Image  src={image1} alt="image" className="image1" />
            </ScrollAnimation>
             <img  src={waveL} alt="image" className="wave1" />
             <div className="detailBox">
                  <ScrollAnimation animateIn="backInRight">
                 <h3>Why be part of this event?</h3>
                 </ScrollAnimation>
                 <ScrollAnimation animateIn="bounceInRight">
                 <span>
                    <img src={dot} alt="Dot" />
                    <p>It is a platform to introduce state-of-the-art technologies and developments <br /> in aero defense and security</p>
                 </span>
                 </ScrollAnimation>

                 <ScrollAnimation animateIn="bounceInRight">
                 <span>
                    <img src={dot} alt="Dot" />
                    <p>Have an opportunity to intensify your presence in the Philippines and Southeast <br /> Asia</p>
                 </span>
                 </ScrollAnimation>
                 <ScrollAnimation animateIn="bounceInRight">
                 <span>
                    <img src={dot} alt="Dot" />
                    <p>Network with key officials from the Philippine Air Force and other agencies <br /> to build, strengthen and maintain your relationship</p>
                 </span>
                 </ScrollAnimation>
             </div>
        </div>

        <div className="homeContext2Box2">
        <ScrollAnimation animateIn="slideInLeft" className="flex items-center justify-center">
           <p className="">Globally recognized OEMs (Original Equipment Manufacturers) and
            proponents as well as homegrown innovators are invited to showcase
            the latest advancements and state-of-the-art technologies
            in aerospace defense, security, and warfare. The event is especially
            aimed in addressing the modernization requirements of the Philippine
            Air Force.</p>
         </ScrollAnimation>
            <div className="homeContext2BoxImg">
             <img  src={waveR} alt="image" className="wave2" />
             <ScrollAnimation animateIn="flipInX">
             <Image  src={image2} alt="image" className="image1" />
             </ScrollAnimation>
             <ScrollAnimation animateIn="flipInX">
             <Image  src={image3} alt="image" className="image1" />
             </ScrollAnimation>
            </div>
        </div>
    </div>
  )
}
