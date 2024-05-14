import "./Dss.css"
import Header from "./Header"
import Program from "./Program"
import Speakers from "./Speakers"
import Footer from '../footer/Footer'
import {motion as m} from "framer-motion"

export default function index() {
  return (
    <m.div
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ duration:0.75, ease: "easeOut" }}>
        <Header />
        <Speakers />
        <Program />
        <Footer />
    </m.div>
  )
}
