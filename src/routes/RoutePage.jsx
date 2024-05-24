import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Speakers from '../pages/air-force-symposium/Speakers'
import Program from '../pages/air-force-symposium/Program'
import OnlineStreaming from '../pages/air-force-symposium/OnlineStreaming'
import ContactUs from '../pages/contact-us/ContactUs'
import Index1 from '../pages/air-force-symposium/index'
import Index2 from '../pages/defense-suppliers-summit/index'
import Expo from '../pages/expo/Expo'
import VisitorRegister from '../pages/register/form/visitor/Register'
import ExhibitorRegister from '../pages/register/form/exibitor/Register'


export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='' element={<Home />} />
      <Route path='/speakers' element={<Speakers />} />
      <Route path='/program' element={<Program />} />
      <Route path='/online-streaming' element={<OnlineStreaming />} />
      <Route path='/contact-us' element={<ContactUs/>} />
      <Route path='/expo' element={<Expo/>} />
      <Route path='/air-force-symposium' element={<Index1/>} />
      <Route path='/defense-suppliers-summit' element={<Index2/>} />
      <Route path='/participant'  element={<VisitorRegister/>} />
      <Route path='/exhibitor'  element={<ExhibitorRegister/>} />
    </Routes>
  )
}
