import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logo-2.png';
import "./Navbar.css";
import { FaAngleDown } from "react-icons/fa6";
import { HashLink } from 'react-router-hash-link';

function BasicExample() {
  return (
    <div className='w-full sticky top-0 z-30 bg-white'>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className='logo'>
            <img src={logo} alt="logo" className='w-[150px]' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbarLinkBox">
              <Nav.Link as={NavLink} onClick={() => { window.scroll(0, 0) }} to="/" activeclassname="active">Home</Nav.Link>

              <div className='linkMenuBox'>
                <Nav.Link as={NavLink} onClick={() => { window.scroll(0, 0) }} to="/expo-asia/air-force-symposium" activeclassname="active">
                  <span> Air Force Symposium <FaAngleDown /></span>
                </Nav.Link>
                <div className='linkMenu'>
                  <HashLink to="/expo-asia/air-force-symposium#speakers">Speakers</HashLink>
                  <HashLink to="/expo-asia/air-force-symposium#program">Program</HashLink>
                  <HashLink to="/expo-asia/air-force-symposium#online-streaming">Online Streaming</HashLink>
                </div>
              </div>

              <div className='linkMenuBox'>
                <Nav.Link onClick={() => { window.scroll(0, 0) }}  as={NavLink} to="/expo-asia/defense-suppliers-summit" activeclassname="active">
                  <span>Defense Suppliers Summit <FaAngleDown /></span>
                </Nav.Link>
                <div className='linkMenu'>
                  {/* <HashLink to="/expo-asia/defense-suppliers-summit#speakers">Speakers</HashLink> */}
                  <HashLink to="/expo-asia/defense-suppliers-summit#program">Program</HashLink>
                  {/* <HashLink to="/expo-asia/defense-suppliers-summit#meetings">Meetings</HashLink> */}
                </div>
              </div>

              <div className='linkMenuBox'>
                <Nav.Link onClick={() => { window.scroll(0, 0) }} as={NavLink} to="/expo-asia/expo" activeclassname="active">
                  <span>Expo <FaAngleDown /></span>
                </Nav.Link>
                <div className='linkMenu'>
                  <HashLink to="/expo-asia/expo#sponsors">Sponsors/Partners</HashLink>
                  <HashLink to="/expo-asia/expo#visitors">Visitors</HashLink>
                </div>
              </div>

              <Nav.Link onClick={() => { window.scroll(0, 0) }} as={NavLink} to="/expo-asia/contact-us" activeclassname="active">Contact Us</Nav.Link>
           
           
              <div className='linkMenuBox'>
                <div
                className='registerbtn'
                as={NavLink} to="/expo-asia/expo" activeclassname="active">
                  <span>Register Now </span>
                </div>
                <div className='linkMenu'>
                  <HashLink to="/expo-asia/participant">Participant</HashLink>
                  <HashLink to="/expo-asia/exhibitor">Sponsor/Exhibitor</HashLink>
                </div>
              </div>
         
           </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default BasicExample;
