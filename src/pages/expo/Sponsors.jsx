import image from '../../assets/expo/test.png'

export default function Sponsors() {
  return (
    <div className="sponsorsContainer">
        <h1>Sponsors/Partners</h1>
        <p>We extend our heartfelt gratitude to all our sponsors and partners whose unwavering support has <br />
         made this event possible. Their commitment to excellence and innovation is truly commendable.</p>
        <img src={image} alt="image" />
    </div>
  )
}
