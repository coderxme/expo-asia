import "./ContactUs.css"
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import Footer from "../footer/Footer";
import {motion as m} from "framer-motion"
import { FloatButton } from 'antd';
import GoogleMap from "./GoogleMap";


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
             <div className="contactUs">
               <h3>Contact Us</h3>
                <span>
                  <h4>Expo Asia</h4>
                    <p><BsTelephoneFill /> +63 966 944 8936</p>
                    <p><MdEmail /> sales@expoasia.online</p>
                  </span>  
                  <span>
                    <h4>Philippine Air Force</h4>
                    <div className="p-text">
                      <p className="p1">For any inquiries, please contact:</p>
                      <p  className="p2">LTC MARVIN D ALAMBRA PAF (GSC)</p>
                      <p  className="p1">Executive Officer, OA-5</p>
                    </div>
                    <p><BsTelephoneFill />+63 917 846 2006</p>
                    <p><MdEmail /> oa5.dsp@airforce.mil.ph <br />
                    dsp.a5hpaf@gmail.com</p>
                  </span> 
             </div>
             <div className="social">
             <h3 className="followUs">Follow us</h3>
              <p className="flex gap-2">
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
             </div>
              
         </div>

         <GoogleMap />
         </div>
      </div>
      <Footer />
      <FloatButton.BackTop />

    </m.div>
  )
}
