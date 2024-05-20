import test2 from '../../assets/expo/test2.png'
import ScrollAnimation from 'react-animate-on-scroll';

export default function Featured() {
  return (
    <div className="featuredContainer">
      <ScrollAnimation animateIn="backInUp">
        <h1>Featured Sponsors</h1>
      </ScrollAnimation>

      <ScrollAnimation animateIn="zoomInDown" className='flex items-center justify-center'>
        <img src={test2} alt="test2" />
      </ScrollAnimation>
    </div>
  )
}
