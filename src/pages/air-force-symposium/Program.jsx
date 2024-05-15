import { Image } from 'antd';
import image1 from '../../assets/Artboard1.svg'
import image2 from '../../assets/Artboard2.svg'
import BlueWave1 from '../../assets/blue-image1.svg';
import BlueWave2 from '../../assets/blue-image2.svg';
import ScrollAnimation from 'react-animate-on-scroll';

export default function Program() {
  return (
    <div className="programContainer" id="program">
      <img src={BlueWave1} alt=""  className='blueWave1'/>
      <img src={BlueWave2} alt=""  className='blueWave2'/>
      <ScrollAnimation animateIn="swing">
      <h1>Program</h1>
      </ScrollAnimation>
      <div className="programImageBox">
      <ScrollAnimation animateIn="fadeInLeft">
         <Image src={image1} alt="image1" className='image' />
        </ScrollAnimation>
      <ScrollAnimation animateIn="fadeInRight">
         <Image src={image2} alt="image2"  className='image'/>
        </ScrollAnimation>
      </div>
    </div>
  )
}
