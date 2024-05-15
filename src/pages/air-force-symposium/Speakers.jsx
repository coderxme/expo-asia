import Event from '../../assets/events.svg'
import EventBackground from '../../assets/event-background.svg'
import ScrollAnimation from 'react-animate-on-scroll';

export default function Speakers() {
  
  return (
    <section className="speakersContainer" id='speakers'>
        <ScrollAnimation animateIn="swing">
      <h1>Speakers</h1>
      </ScrollAnimation>
      <ScrollAnimation animateIn="bounceIn" className='w-full flex items-center justify-center'>
      <p><b className='text-[#27638D]'>DAY 2</b> - June 14,2024</p>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn" className='w-full flex items-center justify-center'>
      <img src={Event} alt="" className='image1' />
      </ScrollAnimation>
      <img src={EventBackground} alt="" className='image2' />
    </section>
  )
}
