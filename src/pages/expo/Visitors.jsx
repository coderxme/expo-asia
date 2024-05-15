import { Image } from 'antd'
import image from '../../assets/expo/visitor.svg'

export default function Visitors() {
  return (
    <div className="visitorsContainer">
        <h1>Visitors</h1>
        <Image src={image} alt="image" className='img'  />
    </div>
  )
}
