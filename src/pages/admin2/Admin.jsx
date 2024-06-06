/* eslint-disable no-fallthrough */
import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Breadcrumb } from 'antd'; // Import Breadcrumb
import Logo from '../../assets/logo-2.png';
import "./Admin.css";
import ButtonLogout from './ButtonLogout';
import BoothAttendee from './pages/booth/BoothAttendee';
import { IoPeopleOutline } from "react-icons/io5";
import { LiaPersonBoothSolid } from "react-icons/lia";
import Dashboard from './pages/dashboard/Dashboard';
import { RxDashboard } from "react-icons/rx";
import useAdminStore from '../../store/adminStore';
import Account from '../admin2/pages/account/Account';

const { Header, Sider, Content } = Layout;
// const { SubMenu } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('111');
  const [breadcrumbs, setBreadcrumbs] = useState(['Dashboard']); // State to keep track of breadcrumbs
  const { myAccountData } = useAdminStore()
  
  const handleMenuClick = (e) => {
    setSelectedMenuKey(e.key);
    updateBreadcrumbs(e.key);
  };

  const updateBreadcrumbs = (key) => {
    let updatedBreadcrumbs = ['Dashboard']; 
    switch (key) {
      case '111':
        break;
      // case '3':
      //   updatedBreadcrumbs.push('Booth');
      //   break;
      case '4':
        updatedBreadcrumbs.push('Booth Attendee');
        break;
      case '10':
        updatedBreadcrumbs.push('Account');
      default:
        break;
    }
    setBreadcrumbs(updatedBreadcrumbs);
  };

  let contentText = '';
  switch (selectedMenuKey) {
    case '111':
      contentText = <Dashboard />;
      break;
    // case '3':
    //   contentText = <Booth />;
    //   break;
    case '4':
      contentText = <BoothAttendee />;
      break;
    case '10':
      contentText = <Account />;
      break;
    default:
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

          <Menu.Item key="4" icon={<LiaPersonBoothSolid />}>
            Booth Attendance
          </Menu.Item>
          
          {/* <SubMenu key="sub1" icon={<LiaPersonBoothSolid />} title="Booth">
            <Menu.Item key="3">Booth</Menu.Item>
            <Menu.Item key="4">Attendee</Menu.Item>
          </SubMenu> */}
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
              <Breadcrumb.Item className=' uppercase font-bold text-xs text-gray-500' key={index}>{breadcrumb}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>

          <div className="navbarRight">
           <p className='greet'>Hello, <b>{myAccountData.username}</b>!</p>
            <Menu onClick={handleMenuClick} selectedKeys={[selectedMenuKey]} >
              <Menu.Item key="10" className='buttonAccount' icon={<IoPeopleOutline />}>
                Account
              </Menu.Item>
            </Menu>
            <ButtonLogout />
          </div>
        </Header>
        <Content style={{ padding: 10, minHeight: 280 }} className='bg-white'>
          {contentText}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
