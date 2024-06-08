/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiLogout} from '../api/api';
import { Button, Tooltip } from 'antd';
import { RiLogoutCircleLine } from "react-icons/ri";
import useCsrfTokenStore from '../store/csrfTokenStore'
import Cookies from "js-cookie";

export default function btnLogout() {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken);
    const navigate = useNavigate()

      const handleLogout = async (e) => {
        e.preventDefault();
        try {
          const headers = {
            'X-CSRFToken': csrfToken // Include the CSRF token in the request headers
          };
          await axios.get(apiLogout, null, { headers });
          Cookies.remove("sessionid");
          navigate('/login');
        } catch (error) {
          console.error('Logout error:', error);
        }
      };
    

  return (
    <Tooltip title="Logout">
      <Button className='rounded-full' danger type='primary' icon={<RiLogoutCircleLine/>}  onClick={handleLogout} />
    </Tooltip>
      
  )
}
