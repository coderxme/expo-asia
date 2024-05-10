import Footer from '../footer/Footer'
import Carousel from './Carousel'
import Details from './Details'
import "./Home.css"

export default function Home() {
  return (
    <div className=''>
      <Carousel />
      <Details />
      <Footer />
    </div>
  )
}
