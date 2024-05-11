import Event from '../../assets/events.svg'
import EventBackground from '../../assets/event-background.svg'

export default function Speakers() {
  
  return (
    <section className="speakersContainer" id='speakers'>
      <h1>Speakers</h1>
      <p><b className='text-[#27638D]'>DAY 2</b> - June 14,2024</p>
      <img src={Event} alt="" className='image1' />
      <img src={EventBackground} alt="" className='image2' />
    </section>
  )
}
