/* eslint-disable no-irregular-whitespace */
import {  Carousel } from 'antd';
import image from '../../assets/carouselImage.svg'
import { GrNext } from "react-icons/gr";
import { Link } from 'react-router-dom';

const App = () => (
  <Carousel autoplay>
    <div className='carouselBox carouselBox1'>
        <img src={image} alt="" />
        <p>Join the biggest Pre-Anniversary celebration of the Philippine Air Force <br />
        June 13-14, 2024 | Marriott Grand Ballroom Manila<br />
         <b>Air Force Symposium & Expo 2024</b>
        </p>

        <div className='carouselBtn'>
           <Link to={'/register'}  state={{ user: "visitor" }}>
              <button>Register as Visitor <GrNext/> </button>
           </Link>
           <Link to={'/register'}  state={{ user: "exhibitor" }}>
            <button>Register as Sponsor/Exhibitor <GrNext/></button>
           </Link>

        </div>
    </div>
    <div className='carouselBox carouselBox1'>
        <img src={image} alt="" />
        <p>Join the biggest Pre-Anniversary celebration of the Philippine Air Force <br />
        June 13-14, 2024  | Marriott Grand Ballroom Manila <br />
         <b>Air Force Symposium & Expo 2024</b>
        </p>

        <div className='carouselBtn'>
           <Link to={'/register'} state={{ user: "visitor" }}>
            <button>Register as Visitor <GrNext/> </button>
            </Link>
            <Link to={'/register'} state={{ user: "exhibitor" }}>
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
           <Link to={'/register'} state={{ user: "visitor" }}>
              <button>Register as Visitor <GrNext/> </button>
            </Link>
            <Link to={'/register'}  state={{ user: "exhibitor" }}>
              <button>Register as Sponsor/Exhibitor <GrNext/></button>
            </Link>
        </div>
    </div>
   
  </Carousel>
);
export default App;