import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/navbar/Navbar'
import Register from './pages/register/Register'
import Speakers from './pages/air-force-symposium/Speakers'
import Program from './pages/air-force-symposium/Program'
import OnlineStreaming from './pages/air-force-symposium/OnlineStreaming'
import ContactUs from './pages/contact-us/ContactUs'
import Index1 from './pages/air-force-symposium/index'
import Index2 from './pages/defense-suppliers-summit/index'


export default function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/speakers' element={<Speakers />} />
      <Route path='/program' element={<Program />} />
      <Route path='/online-streaming' element={<OnlineStreaming />} />
      <Route path='/contact-us' element={<ContactUs/>} />
      <Route path='/air-force-symposium' element={<Index1/>} />
      <Route path='/defense-suppliers-summit' element={<Index2/>} />
    </Routes>
    </>
  )
}
