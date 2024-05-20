import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Logo from '../../assets/logo-2.png'
import "./Admin.css"
import ButtonLogout from './ButtonLogout'
import BoothAttendee from './pages/booth/BoothAttendee';
import Booth from './pages/booth/Booth'
import { FaPersonBooth } from "react-icons/fa";
import Participant from './pages/participant/Participant';
import Event from './pages/event/Event';
import EventAttendee from './pages/event/EventAttendee';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1'); // State to keep track of the selected menu item

  const handleMenuClick = (e) => {
    setSelectedMenuKey(e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let contentText = '';
  switch (selectedMenuKey) {
    case '1':
      contentText = <Participant />;
      break;
    case '2':
      contentText = <Booth />;
      break;
    case '3':
      contentText = <BoothAttendee />;
      break;
    case '4':
      contentText = <Event />;
      break;
    case '5':
      contentText = <EventAttendee />;
      break;
    default:
      contentText = 'Unknown content';
      break;
  }

  

  return (
    <Layout >

      <Sider trigger={null} collapsible collapsed={collapsed} className='sidebar bg-white' >
        <img src={Logo} alt="logo" className='mb-10' />
        <div className="demo-logo-vertical" />

        <Menu
          className='menuBox border-0'
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleMenuClick} // Handle menu item click event
          selectedKeys={[selectedMenuKey]} // Highlight the selected menu item
        >
         <Menu.Item key="1" icon={<UserOutlined />}>
            Participant
          </Menu.Item>
          <SubMenu key="sub1" icon={<FaPersonBooth />} title="Booth">
            <Menu.Item key="2">Booth</Menu.Item>
            <Menu.Item key="3">Booth Attendee</Menu.Item>
          </SubMenu>
         
          <SubMenu key="sub2" icon={<FaPersonBooth />} title="Event">
            <Menu.Item key="4">Event</Menu.Item>
            <Menu.Item key="5">Event Attendee</Menu.Item>
          </SubMenu>
       
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight:"10px"
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <ButtonLogout />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {contentText} {/* Render the dynamic content */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
