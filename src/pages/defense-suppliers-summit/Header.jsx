import { Image } from 'antd';
import image1 from '../../assets/blue-image1.svg';
import image2 from '../../assets/blue-image2.svg';
import image3 from '../../assets/page3/image1.svg';
import CountDown from './CountDown';
import {motion as m} from "framer-motion"

export default function Header() {
  return (
    <m.div 
    variants={{
      hidden: { opacity: 0, y:75 },
      visible: { opacity: 1, y:0 },
    }}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay: 0.50 }}
    className="dssHeaderContainer">
      <img src={image1} alt="" className='image1'/>
      <img src={image2} alt=""   className='image2'/>
        <h1>Defense Suppliers’ Summit</h1>
        <p>Aside from the annual Air Force Symposium, this event holds the first-ever Suppliers’ 
          Defense Summit as it invites OEMs (Original Equipment Manufacturers) to discuss and showcase
           a congregation of aero and defense industries. This opens opportunities for PAF Units and 
           operators to learn from the best practices of proponents and other Air Forces on how to effectively and 
          cost-efficiently operate and manage platforms currently utilized by the PAF.</p>

           <Image src={image3} className='image3' />

           <CountDown />
    </m.div>
  )
}
