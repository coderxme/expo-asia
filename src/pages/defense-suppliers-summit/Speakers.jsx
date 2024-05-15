import Tabs from './Tabs'
import ScrollAnimation from 'react-animate-on-scroll';


export default function Speakers() {
  
  return (
    <section className="dds-speakersContainer" id='speakers'>
      <ScrollAnimation animateIn="swing">
      <h1>Speakers</h1>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn">
      <Tabs />
      </ScrollAnimation>
    </section>
  )
}
