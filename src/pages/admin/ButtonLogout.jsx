/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { apiLogout, getCsrfToken } from '../../api/api';
import { Button, Tooltip } from 'antd';
import { RiLogoutCircleLine } from "react-icons/ri";



export default function btnLogout() {
    const [csrfToken, setCsrfToken] = useState('');
    const { dispatch } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        const getTheCsrfToken = async () => {
          try {
            const response = await axios.get(getCsrfToken);
            setCsrfToken(response.data['csrf-token']);
            console.log(response.data['csrf-token'])
          } catch (error) {
            console.log(error);
          }
        };
    
      
        getTheCsrfToken();
      }, []);


      const handleLogout = async (e) => {
        e.preventDefault();
        try {
          const headers = {
            'X-CSRFToken': csrfToken // Include the CSRF token in the request headers
          };
      
          await axios.get(apiLogout, null, { headers });
          dispatch({ type: 'LOGOUT' });
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
