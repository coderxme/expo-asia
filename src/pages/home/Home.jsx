import Footer from '../footer/Footer'
import Carousel from './Carousel'
import Details from './Details'
import "./Home.css"
import {motion as m} from "framer-motion"

export default function Home() {
  return (
    <m.div
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ duration:0.75, ease: "easeOut" }}
    className=''>
      <Carousel />
      <Details />
      <Footer />
    </m.div>
  )
}
