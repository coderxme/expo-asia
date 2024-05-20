import { Image } from 'antd';
import image1 from '../../assets/Artboard1.png'
import image2 from '../../assets/Artboard2.png'
import BlueWave1 from '../../assets/blue-image1.png';
import BlueWave2 from '../../assets/blue-image2.png';
import ScrollAnimation from 'react-animate-on-scroll';

export default function Program() {
  return (
    <div className="programContainer" id="program">
      <img src={BlueWave1} alt=""  className='blueWave1'/>
      <img src={BlueWave2} alt=""  className='blueWave2'/>
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
