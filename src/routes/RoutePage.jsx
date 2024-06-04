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
import NoPageAvailable from './NoPageAvailable'


const routes = [
  { path: '/', element: <Home />, exact: true },
  { path: '/speakers', element: <Speakers /> },
  { path: '/program', element: <Program /> },
  { path: '/online-streaming', element: <OnlineStreaming /> },
  { path: '/contact-us', element: <ContactUs /> },
  { path: '/expo', element: <Expo /> },
  { path: '/air-force-symposium', element: <Index1 /> },
  { path: '/defense-suppliers-summit', element: <Index2 /> },
  { path: '/participant', element: <VisitorRegister /> },
  { path: '/exhibitor', element: <ExhibitorRegister /> },
  { path: '*', element: <NoPageAvailable /> },
];


export default function RoutePage() {
  return (
    <Routes>
        {routes.map(({ path, element, exact }) => (
          <Route key={path} path={path} element={element} exact={exact} />
        ))}
    </Routes>
  )
}