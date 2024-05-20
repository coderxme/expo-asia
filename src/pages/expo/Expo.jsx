import Header from "./Header";
import './Expo.css'
import Sponsors from "./Sponsors";
import Featured from "./Featured";
import Visitors from "./Visitors";
import Accomodation from "./Accomodation";
import Official from "./Official";
import Footer from '../footer/Footer'
import { FloatButton } from 'antd';

export default function Expo() {
  return (
    <div className="expoContainer">
        <Header />
        <Sponsors />
        <Featured />
        <Visitors />
        <Accomodation />
        <Official />
        <Footer />
      <FloatButton.BackTop />
    </div>
  )
}
