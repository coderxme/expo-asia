import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Logo from '../../assets/logo.png'
import "./Admin.css"
import ButtonLogout from './ButtonLogout'
import Booth from './booth/Booth';
import BoothAttendee from './booth/BoothAttendee';
import { FaPersonBooth } from "react-icons/fa";

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
      contentText = <Booth />;
      break;
    case '2':
      contentText = <BoothAttendee />;
      break;
    case '3':
      contentText = 'Content for Option 3';
      break;
    case '4':
      contentText = 'Content for Option 4';
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
        
        <SubMenu key="sub1" icon={<FaPersonBooth />} title="Booth">
            <Menu.Item key="1">Booth</Menu.Item>
            <Menu.Item key="2">Booth Attendee</Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<UserOutlined />}>
            Booth
          </Menu.Item>
          <Menu.Item key="4" icon={<VideoCameraOutlined />}>
            Booth Attendee
          </Menu.Item>
       
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
