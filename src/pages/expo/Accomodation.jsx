import { Image } from 'antd'
import image1 from '../../assets/expo/building/image1.png'
import image2 from '../../assets/expo/building/image2.png'
import image3 from '../../assets/expo/building/image3.png'
import image4 from '../../assets/expo/building/image4.png'
import image5 from '../../assets/expo/building/image5.png'
import image6 from '../../assets/expo/building/image6.png'
import { FaStar, FaRegStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GrNext } from "react-icons/gr";
import ScrollAnimation from 'react-animate-on-scroll';


export default function Accomodation() {
  return (
    <div className="accomodationContainer">
      <ScrollAnimation animateIn="swing">
        <h1>Accomodation</h1>
        </ScrollAnimation>

        <ScrollAnimation animateIn="slideInLeft">
        <p>Explore nearby hotels for convenient lodging options.</p>
        </ScrollAnimation>
        <div className="accomodationBoxWrapper">
             <ScrollAnimation animateIn="zoomInLeft">
                <div className="accomodationBox">
                    <Image src={image1} alt="image" />
                    <span>
                        <h3>Arzo Hotel Makati</h3>
                        <h4>15 min</h4>
                        <div className="ratings">
                            <span>3.9</span>
                            <div className="icons">
                                <FaStar className='text-yellow-400'/>
                                <FaStar className='text-yellow-400'/>
                                <FaStar className='text-yellow-400'/>
                                <FaStar className='text-yellow-400'/>
                                <FaRegStar className='text-yellow-400'/>
                            </div>
                            <span>(84)</span>
                        </div>

                        <p className='text1'>Straightforward hotel with parking</p>

                        <div className="btnBox">
                            <button>Free Parking</button>
                            <button>Free Wifi</button>
                            <button>Air-conditioned</button>
                        </div>
                        <Link to={"#"} className='btnCheck'>Check <GrNext /></Link>
                    </span>
                </div>
             </ScrollAnimation>
             <ScrollAnimation animateIn="zoomInRight">
             <div className="accomodationBox">
                 <Image src={image2} alt="image" />
                 <span>
                     <h3>Arzo Hotel Makati Premier</h3>
                     <h4>15 min</h4>
                     <div className="ratings">
                        <span>4.2</span>
                        <div className="icons">
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaRegStar className='text-yellow-400'/>
                        </div>
                        <span>(16)</span>
                     </div>

                     <p className='text1'>Hotel</p>

                     <div className="btnBox">
                         <button>Free Wifi</button>
                         <button>Air-conditioned</button>
                         <button>Restaurant</button>
                     </div>
                     <Link to={"#"} className='btnCheck'>Check <GrNext /></Link>
                 </span>
             </div>
             </ScrollAnimation>
             <ScrollAnimation animateIn="zoomInLeft">
             <div className="accomodationBox">
                 <Image src={image3} alt="image" />
                 <span>
                     <h3>Hop Inn Hotel Aseana City Manila</h3>
                     <h4>15 min</h4>
                     <div className="ratings">
                        <span>4.3</span>
                        <div className="icons">
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaRegStar className='text-yellow-400'/>
                        </div>
                        <span>(1530)</span>
                     </div>

                     <p className='text1'>Unpretentious rooms with Free Wi-Fi.</p>

                     <div className="btnBox">
                         <button>Free Parking</button>
                         <button>Free Wifi</button>
                         <button>Air-conditioned</button>
                     </div>
                     <Link to={"#"} className='btnCheck'>Check <GrNext /></Link>
                 </span>
             </div>
             </ScrollAnimation>

             <ScrollAnimation animateIn="zoomInRight">
             <div className="accomodationBox">
                 <Image src={image4} alt="image" />
                 <span>
                     <h3>Jupiter Suites</h3>
                     <h4>15 min</h4>
                     <div className="ratings">
                        <span>4.1</span>
                        <div className="icons">
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaRegStar className='text-yellow-400'/>
                        </div>
                        <span>(217)</span>
                     </div>

                     <p className='text1'>Casual budget hotel with free breakfast</p>

                     <div className="btnBox">
                         <button>Free Wifi</button>
                         <button>Air-conditioned</button>
                         <button>Restaurant</button>
                     </div>
                     <Link to={"#"} className='btnCheck'>Check <GrNext /></Link>
                 </span>
             </div>
             </ScrollAnimation>

             <ScrollAnimation animateIn="zoomInLeft">
             <div className="accomodationBox">
                 <Image src={image5} alt="image" />
                 <span>
                     <h3>Manila Airport Hotel</h3>
                     <h4>15 min</h4>
                     <div className="ratings">
                        <span>43.7</span>
                        <div className="icons">
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaRegStar className='text-yellow-400'/>
                            <FaRegStar className='text-yellow-400'/>
                        </div>
                        <span>(869)</span>
                     </div>

                     <p className='text1'>Simple lodging with an airport shuttle</p>

                     <div className="btnBox">
                         <button>Pool</button>
                         <button>Free Wifi</button>
                         <button>Air-conditioned</button>
                     </div>
                     <Link to={"#"} className='btnCheck'>Check <GrNext /></Link>
                 </span>
             </div>
             </ScrollAnimation>
             <ScrollAnimation animateIn="zoomInRight">
             <div className="accomodationBox">
                 <Image src={image6} alt="image" />
                 <span>
                     <h3>Palmtree-genlex Newport</h3>
                     <h4>15 min</h4>
                     <div className="ratings">
                        <span>4.0</span>
                        <div className="icons">
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaStar className='text-yellow-400'/>
                            <FaRegStar className='text-yellow-400'/>
                        </div>
                        <span>(21)</span>
                     </div>

                     <p className='text1'>2-star hotel</p>

                     <div className="btnBox">
                         <button>Pool</button>
                         <button>Free Wifi</button>
                         <button>Air-conditioned</button>
                     </div>
                     <Link to={"#"} className='btnCheck'>Check <GrNext /></Link>
                 </span>
             </div>
             </ScrollAnimation>
        </div>
    </div>
  )
}
