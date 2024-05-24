import { Image } from 'antd'
import image from '../../assets/expo/visitors.png'
import ScrollAnimation from 'react-animate-on-scroll';

export default function Visitors() {
  return (
    <div className="visitorsContainer" id='visitors'>
      <ScrollAnimation animateIn="backInUp">
        <h1>Visitors</h1>
      </ScrollAnimation>
      <ScrollAnimation animateIn="zoomInUp" className='flex items-center justify-center'>
        <Image src={image} alt="image" className='img'  />
        </ScrollAnimation>
    </div>
  )
}
