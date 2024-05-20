/* eslint-disable react/no-unescaped-entities */
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { GrNext } from "react-icons/gr";
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
    className="expoHeader">
        <h1>Expo</h1>
        <p>
        Welcome to the Expo, the beating heart of the <b>Air Force Symposium and Expo 2024!</b> <br />
       This is where innovation meets opportunity, and where cutting-edge technologies and solutions take center stage.
        </p>
        <img src={Logo} alt="logo" />
        <p>Don't miss your chance to be part of this unparalleled showcase of innovation and excellence. <br /> Book your space now to secure your spot at the Expo.</p>
        <Link to={'#'} className='btn'>
           Book your space now <GrNext/>
        </Link>
    </m.div>
  )
}
