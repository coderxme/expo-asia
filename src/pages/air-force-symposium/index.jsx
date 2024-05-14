import Header from "./Header";
import OnlineStreaming from "./OnlineStreaming";
import Program from "./Program";
import Speakers from "./Speakers";
import './AirForce.css'
import Footer from '../footer/Footer'
import {motion as m} from "framer-motion"


export default function Index() {
  return (
    <m.div
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ duration:0.75, ease: "easeOut" }}
    className="airforceContainer">
      <Header />
        <Speakers />
        <Program />
        <OnlineStreaming />
        <Footer />
    </m.div>
  )
}
