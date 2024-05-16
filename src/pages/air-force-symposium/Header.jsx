import { Image } from 'antd';
import image1 from '../../assets/blue-image1.svg';
import image2 from '../../assets/blue-image2.svg';
import image3 from '../../assets/page2/image1.svg';
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
    className="airForceHeaderContainer">
      <img src={image1} alt="" className='image1'/>
      <img src={image2} alt=""   className='image2'/>
        <h1>Air Force Symposium</h1>
        <p>The annual Air Force Symposium is a forum where policymakers, senior leaders, 
          and other stakeholders can have high-level discussions on the current defense and
           security environment. It aims to inform and update policymakers on the emerging 
           threats in various security domains.</p>

           <Image src={image3} className='image3' />

           

           <CountDown />
    </m.div>
  )
}
