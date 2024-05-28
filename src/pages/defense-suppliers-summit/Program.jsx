import { Image } from 'antd';
import image1 from '../../assets/page3/def-1.png'
import image2 from '../../assets/page3/def-2.png'
import ScrollAnimation from 'react-animate-on-scroll';

export default function Program() {
  return (
    <div className="programContainer2" id="program">
      <ScrollAnimation animateIn="backInUp">
      <h1>Program</h1>
      </ScrollAnimation>
      <div className="programImageBox">
      <ScrollAnimation animateIn="backInUp">
         <Image src={image1} alt="image1" className='image' />
        </ScrollAnimation>
      <ScrollAnimation animateIn="backInUp">
         <Image src={image2} alt="image2"  className='image'/>
         </ScrollAnimation>
      </div>
    </div>
  )
}
