import { Image } from 'antd'
import image from '../../assets/expo/blue.png'
import ScrollAnimation from 'react-animate-on-scroll';


export default function Official() {
  return (
    <div className='officialContainer'>
        <div className="officialWrapper">
            <div className="officialBox1">
                <div className="officialDetail">
                   <ScrollAnimation animateIn="backInUp">
                    <h1>Official Logistics Partner</h1>
                    </ScrollAnimation>
                   <ScrollAnimation animateIn="backInUp">
                    <p>Our Official Logistics Partner is committed to ensuring seamless coordination and smooth operations for the Air Force Symposium and Expo 2024. With expertise in event logistics management, they provide comprehensive support to exhibitors and organizers alike. From transportation and warehousing to on-site logistics coordination, they ensure that every aspect of the event runs efficiently. Partnering with our Official Logistics Partner guarantees reliability, professionalism, and peace of mind throughout the event.</p>
                    </ScrollAnimation>
                </div>
                <div className="officialImg">
                <Image src={image} />
                </div>
            </div>
            <div className="officialBox2">
              <div className="officialImg">
              <Image src={image} />
              </div>
                <div className="officialDetail">
                  <ScrollAnimation animateIn="backInUp">
                    <h1>Official Booth Contractor</h1>
                 </ScrollAnimation>
                 <ScrollAnimation animateIn="backInUp">
                    <p>
                    Our Official Booth Contractor specializes in bringing exhibition spaces to life. With a focus on creativity and precision, they transform concepts into captivating realities. From design and fabrication to installation and dismantling, they provide end-to-end solutions tailored to your needs. With their expertise, your booth will stand out at the Air Force Symposium and Expo 2024, leaving a lasting impression on attendees.
                    </p>
                  </ScrollAnimation>
                </div>
                
            </div>
        </div>
    </div>
  )
}
