import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Breadcrumb } from 'antd'; // Import Breadcrumb
import Logo from '../../assets/logo-2.png';
import "./Admin.css";
import ButtonLogout from './ButtonLogout';
import BoothAttendee from './pages/booth/BoothAttendee';
import Booth from './pages/booth/Booth';
import Participant from './pages/participant/Participant';
import Event from './pages/event/Event';
import EventAttendee from './pages/event/EventAttendee';
import Company from './pages/company/Company';
import { FaPersonBooth, FaRegBuilding } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { LiaPersonBoothSolid } from "react-icons/lia";
import CompanyType from './pages/company-type/CompanyType';
import { MdOutlineEvent } from "react-icons/md";
import Account from './pages/account/Account';
import Dashboard from './pages/dashboard/Dashboard';
import { RxDashboard } from "react-icons/rx";
import Invite from "./pages/invite/Invite"
import { CgDetailsMore } from "react-icons/cg";

import { AiOutlineMail } from "react-icons/ai";
import Forum from './pages/forum/Forum';
import EventCalendar from './pages/event/EventCalendar';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('111');
  const [breadcrumbs, setBreadcrumbs] = useState(['Dashboard']); // State to keep track of breadcrumbs

  const handleMenuClick = (e) => {
    setSelectedMenuKey(e.key);
    updateBreadcrumbs(e.key);
  };

  const updateBreadcrumbs = (key) => {
    let updatedBreadcrumbs = ['Dashboard']; // Default breadcrumb
    switch (key) {
      case '111':
        break;
      case '1':
        updatedBreadcrumbs.push('Participant');
        break;
      case '2':
        updatedBreadcrumbs.push('Company');
        break;
      case '3':
        updatedBreadcrumbs.push('Booth');
        break;
      case '4':
        updatedBreadcrumbs.push('Booth', 'Booth Attendee');
        break;
      case '6':
        updatedBreadcrumbs.push('Event');
        break;
      case '7':
        updatedBreadcrumbs.push('Event', 'Event Attendee');
        break;
      case '8':
        updatedBreadcrumbs.push('Company', 'Company Type');
        break;
      case '9':
        updatedBreadcrumbs.push('Account');
        break;
      case '10':
        updatedBreadcrumbs.push('Invite');
        break;
      case '11':
        updatedBreadcrumbs.push('Forum');
        break;
      case '12':
        updatedBreadcrumbs.push('Event', 'Event Calendar');
        break;
      default:
        updatedBreadcrumbs.push('Unknown');
        break;
    }
    setBreadcrumbs(updatedBreadcrumbs);
  };

  let contentText = '';
  switch (selectedMenuKey) {
    case '111':
      contentText = <Dashboard />;
      break;
    case '1':
      contentText = <Participant />;
      break;
    case '2':
      contentText = <Company />;
      break;
    case '3':
      contentText = <Booth />;
      break;
    case '4':
      contentText = <BoothAttendee />;
      break;
    case '6':
      contentText = <Event />;
      break;
    case '7':
      contentText = <EventAttendee />;
      break;
    case '8':
      contentText = <CompanyType />;
      break;
    case '9':
      contentText = <Account />;
      break;
    case '10':
      contentText = <Invite />;
      break;
    case '11':
        contentText = <Forum />;
        break;
    case '12':
      contentText = <EventCalendar />;
      break;
    default:
      contentText = 'Unknown content';
      break;
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='sidebar bg-white'>
        <img src={Logo} alt="logo" className='mb-10' />
        <div className="demo-logo-vertical" />

        <Menu
          className='menuBox border-0'
          mode="inline"
          defaultSelectedKeys={['111']}
          onClick={handleMenuClick}
          selectedKeys={[selectedMenuKey]}
        >
          <Menu.Item key="111" icon={<RxDashboard />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="1" icon={<IoPeopleOutline />}>
            Participant
          </Menu.Item>

          <SubMenu key="sub3" icon={<FaRegBuilding />} title="Company">
            <Menu.Item key="2">Company</Menu.Item>
            <Menu.Item key="8">Company Type</Menu.Item>
          </SubMenu>
          <SubMenu key="sub1" icon={<LiaPersonBoothSolid />} title="Booth">
            <Menu.Item key="3">Booth</Menu.Item>
            <Menu.Item key="4">Booth Attendee</Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<MdOutlineEvent />} title="Event">
            <Menu.Item key="6">Event</Menu.Item>
            <Menu.Item key="7">Event Attendee</Menu.Item>
            <Menu.Item key="12">Event Calendar</Menu.Item>
          </SubMenu>

          <Menu.Item key="10" icon={<AiOutlineMail />}>
            Invite
          </Menu.Item>
          <Menu.Item key="11" icon={<CgDetailsMore />}>
            Forum
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: "10px"
          }}
          className='bg-white  border-b sticky top-0 z-30'
        >
        <div className='flex items-center'>
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className='text-gray-700 ml-2'
          />
          <Breadcrumb style={{ margin: '16px' }}>
            {breadcrumbs.map((breadcrumb, index) => (
              <Breadcrumb.Item className=' uppercase font-bold text-xs text-gray-700' key={index}>{breadcrumb}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
          <div className="navbarRight">
            <Menu onClick={handleMenuClick} selectedKeys={[selectedMenuKey]} >
              <Menu.Item key="9" className='buttonAccount' icon={<IoPeopleOutline />}>
                Account
              </Menu.Item>
            </Menu>
            <ButtonLogout />
          </div>
        </Header>
        <Content
          style={{
            padding: 10,
            minHeight: 280,
          }}
          className='bg-white'
        >
          {contentText}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
