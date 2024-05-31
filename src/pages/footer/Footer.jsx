import Logo from '../../assets/footer-logo.png'
import './Footer.css'
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import ScrollAnimation from 'react-animate-on-scroll';
import { IoLocationSharp } from "react-icons/io5";

export default function Footer() {
  return (
    <div className='footerContainer'>
        <ScrollAnimation animateIn="fadeIn">
        <div className="footerWrapper">
          <img src={Logo} alt="" />
          <div className="footerBox">
               <div className="footerContact">
                   <h3>Contact Us</h3>
                  <div className="footerContactBoxWrapper">
                     <div className="footerContactBox">
                        <h4>ExpoAsia</h4>
                        <p><BsTelephoneFill /> +63 966 944 8936</p>
                        <p><MdEmail /> sales@expoasia.online</p>
                        <div className='address'>
                        <IoLocationSharp />
                           <p>
                           19/F Marco Polo Ortigas Manila, <br />
                           Sapphire Road, Ortigas Centre, <br />
                           Pasig City 1600 Philippines
                           </p>
                        </div>
                     </div>

                   <div className="footerContactBox2">
                       <h4>Philippine Air Force</h4>
                       <p>For any inquiries, please contact:</p>
                       <p className='font-bold'><b>LTC MARVIN D ALAMBRA PAF (GSC)</b></p>
                       <p>Executive Officer, OA-5</p>
                       <div className='pt-2 flex flex-col gap-3'>
                       <p ><BsTelephoneFill />+63 917 846 2006</p>
                       <p><MdEmail /> oa5.dsp@airforce.mil.ph</p>
                       </div>
                   </div>
                  </div>
               </div>

             <span className='footerSocial'>
                <h3>Socials</h3>
               <p>
               <a href="https://www.facebook.com/profile.php?id=100088332602409" target='_blank'>
                   <FaFacebook/>
                 </a>
                <a href="https://www.instagram.com/expoasiainc/" target='_blank'>
                   <RiInstagramFill />
                </a>
                <a href="https://twitter.com/expoasiainc" target='_blank'>
                   <FaXTwitter/>
                </a>
               </p>
             </span>
          </div>
        </div>
        </ScrollAnimation>
        {/* <p className='footerDetail'>Copyright 2024 | All Rights Reserved | ExpoAsia</p> */}
        <p className='footerDetail'></p>
    </div>
  )
}
