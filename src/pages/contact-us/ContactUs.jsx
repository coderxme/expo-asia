import "./ContactUs.css"
import Map from '../../assets/contact/map.png' 
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import Footer from "../footer/Footer";
import { Image } from "antd";
import {motion as m} from "framer-motion"
import { FloatButton } from 'antd';


export default function ContactUs() {
  return (
    <m.div
    variants={{
      hidden: { opacity: 0, y:75 },
      visible: { opacity: 1, y:0 },
    }}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay: 0.50 }}
    className="contactContainer">
     <div className="contactHeader">
     <h1>Get in Touch</h1>
      <p>We're here to help! For any inquiries, assistance, or additional information about the Air Force Symposium and Expo 2024, please reach out to us. <br /> 
        We look forward to connecting with you!</p>

     </div>
      <div className="contactWrapper">
         <div className="contactBox">
         <div className="contactDetails">
         <span>
              <h3>Contact Us</h3>
              <p><BsTelephoneFill /> +63 966 944 8936</p>
              <p><MdEmail /> sales@expoasia.online</p>
         </span>

         <span>
              <h3>Follow Us</h3>
              <p>
                <a href="https://www.facebook.com/profile.php?id=100088332602409" target='_blank'>
                  <FaFacebook />
                </a>

                <a href="https://www.instagram.com/expoasiainc/" target='_blank'>
                  <RiInstagramFill />
                </a>

                <a  href="https://twitter.com/expoasiainc" target='_blank'>
                  <FaXTwitter />
                </a>
              </p>
              
         </span>
         </div>

         <Image src={Map} alt="map" />
         </div>
      </div>
      <Footer />
      <FloatButton.BackTop />

    </m.div>
  )
}
