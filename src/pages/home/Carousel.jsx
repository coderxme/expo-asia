/* eslint-disable no-irregular-whitespace */
import {  Carousel } from 'antd';
import image from '../../assets/carouselImage.png'
import { GrNext } from "react-icons/gr";
import { Link } from 'react-router-dom';
import {motion as m} from "framer-motion"

const App = () => (
  <Carousel autoplay>
    <m.div
     variants={{
      hidden: { opacity: 0, y:75 },
      visible: { opacity: 1, y:0 },
    }}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay: 0.50 }}
    className='carouselBox carouselBox1'>
        <img src={image} alt="" />
        <p >Join the biggest Pre-Anniversary celebration of the Philippine Air Force <br />
        June 13-14, 2024 | Marriott Grand Ballroom Manila<br />
         <b>Air Force Symposium & Expo 2024</b>
        </p>

        <div className='carouselBtn'>
           <Link to={'/expo-asia/visitors'}  state={{ user: "visitor" }}>
              <button>Register as Visitor <GrNext/> </button>
           </Link>
           <Link to={'/expo-asia/exhibitor'}  state={{ user: "exhibitor" }}>
            <button>Register as Sponsor/Exhibitor <GrNext/></button>
           </Link>

        </div>
    </m.div>
    <div className='carouselBox carouselBox1'>
        <img src={image} alt="" />
        <p>Join the biggest Pre-Anniversary celebration of the Philippine Air Force <br />
        June 13-14, 2024  | Marriott Grand Ballroom Manila <br />
         <b>Air Force Symposium & Expo 2024</b>
        </p>

        <div className='carouselBtn'>
           <Link to={'/expo-asia/visitors'} state={{ user: "visitor" }}>
            <button>Register as Visitor <GrNext/> </button>
            </Link>
            <Link to={'/expo-asia/exhibitor'} state={{ user: "exhibitor" }}>
              <button>Register as Sponsor/Exhibitor <GrNext/></button>
            </Link>
        </div>
    </div>
    <div className='carouselBox carouselBox1'>
        <img src={image} alt="" />
        <p>Join the biggest Pre-Anniversary celebration of the Philippine Air Force <br />
        June 13-14, 2024  | Marriott Grand Ballroom Manila<br />
         <b>Air Force Symposium & Expo 2024</b>
        </p>

        <div className='carouselBtn'>
           <Link to={'/expo-asia/visitors'} state={{ user: "visitor" }}>
              <button>Register as Visitor <GrNext/> </button>
            </Link>
            <Link to={'/expo-asia/exhibitor'}  state={{ user: "exhibitor" }}>
              <button>Register as Sponsor/Exhibitor <GrNext/></button>
            </Link>
        </div>
    </div>
   
  </Carousel>
);
export default App;