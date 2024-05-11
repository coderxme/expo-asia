/* eslint-disable react/no-unescaped-entities */
import {  NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.svg';
import "./Navbar.css";
import { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { HashLink } from 'react-router-hash-link';
function BasicExample() {
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)


  const handleMenu1 = () => {
    setShowMenu1(!showMenu1);
    setShowMenu2(false)
    window.scroll(0, 0)

  };
  
  const handleMenu2 = () => {
    setShowMenu2(!showMenu2); 
    setShowMenu1(false)
    window.scroll(0, 0)
  };
  

  return (
   <div className='w-full sticky top-0 z-30 bg-white'>
       <Navbar expand="lg" >
      <Container>
        <Navbar.Brand as={NavLink} to="/home" className=''>
            <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="navbarLinkBox">
            <Nav.Link as={NavLink} onClick={() => { window.scroll(0, 0) }}  to="/home" activeClassName="active">Home</Nav.Link>

         
            <Nav.Link as={NavLink} className='linkMenuBox' onClick={handleMenu1} to="/air-force-symposium" activeClassName="active">
              <span className=''> Air Force Symposium <FaAngleDown/></span>   
              {showMenu1 ? (
              <div className='linkMenu'>
                  <HashLink to="#speakers">Speakers</HashLink>
                  <HashLink to="#program">Program</HashLink>
                  <HashLink to="#online-streaming">Online Streaming</HashLink>
             </div>
            ):null}
            </Nav.Link>


            <Nav.Link as={NavLink} className='linkMenuBox' onClick={handleMenu2} to="/defense-suppliers-summit" activeClassName="active">
              <span className=''>Defense Suppliers Summit <FaAngleDown/></span>   
              {showMenu2 ? (
              <div className='linkMenu'>
                  <a href="#speakers">Speakers</a>
                  <a href="#program">Program</a>
                  <a href="#online-streaming">Meetings</a>
             </div>
            ):null}
            </Nav.Link>
          


            
            <NavDropdown   onClick={() => { window.scroll(0, 0) }}  title="Expo" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/sponsors-partners" activeClassName="active">Sponsors/Partners</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/visitors" activeClassName="active">Visitors</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link  onClick={() => { window.scroll(0, 0) }}  as={NavLink} to="/contact-us" activeClassName="active">Contact Us</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </div>
  );
}

export default BasicExample;
