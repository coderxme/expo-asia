import Header from "./Header";
import OnlineStreaming from "./OnlineStreaming";
import Program from "./Program";
import Speakers from "./Speakers";
import './AirForce.css'
import Footer from '../footer/Footer'

export default function Index() {
  return (
    <div className="airforceContainer">
      <Header />
        <Speakers />
        <Program />
        <OnlineStreaming />
        <Footer />
    </div>
  )
}
