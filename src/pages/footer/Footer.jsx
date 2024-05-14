import Logo from '../../assets/footer-logo.svg'
import './Footer.css'
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className='footerContainer'>
        <div className="footerWrapper">
          <img src={Logo} alt="" />

          <div className="footerBox">
             <span>
                <h3>Contact Us</h3>
                <p><BsTelephoneFill /> +63 966 944 8936</p>
                <p><MdEmail/> sales@expoasia.online</p>
             </span>

             <span className='span2'>
                <h3>Address</h3>
                <p><FaLocationDot /> 19/F Marco Polo Ortigas Manila,
                Sapphire Road, Ortigas Centre,
                Pasig City 1600 Philippines
                </p>
             </span>

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
        <p className='footerDetail'>Copyright 2024 | All Rights Reserved | Expo Asia</p>
    </div>
  )
}
