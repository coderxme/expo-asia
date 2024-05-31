import { useEffect, useCallback, useState, useRef } from 'react';
import { apiLogout } from '../api/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal, Button } from 'antd';
import GetToken from '../context/GetToken';

const AutoLogout = ({ children }) => {
  const csrfToken = GetToken();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(60); // Initial countdown value
  const timerRef = useRef(null);

  const events = ['mousemove'];

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    handleLogoutTimer();
  }, []);

  const handleLogoutTimer = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setShowModal(true);
    }, 300 * 1000); // Set timeout dynamically based on countdown value
  }, [countdown]);

  useEffect(() => {
    const handleUserActivity = () => {
      resetTimer();
      console.log('Mouse movement');
    };

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [resetTimer, events]);

  const logoutAction = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      };
      Cookies.remove('sessionid');
      console.log('Logout will occur in a moment...');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.get(apiLogout, { headers });

      console.log(response);

      if (response.request.status === 200) {
        window.location.href = '/login';
        console.log('Logout successful');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    clearTimeout(timerRef.current);
    setCountdown(60); // Reset countdown to initial value
  };

  useEffect(() => {
    if (showModal) {
      if (countdown > 0) {
        const timerId = setTimeout(() => {
          setCountdown(countdown - 1); // Update countdown every second
        }, 1000);

        return () => clearTimeout(timerId);
      } else {
        handleAutoLogout(); // Auto logout when countdown reaches 0
      }
    }
  }, [showModal, countdown]);

  const handleAutoLogout = () => {
    setShowModal(false);
    logoutAction();
  };

  return (
    <>
      {children}
      <Modal
        title="Warning"
        visible={showModal}
        className='rounded-none'
        closeIcon={false}
        footer={[
          <Button key="confirm" type="primary" className='w-full bg-teal-500 text-white ' onClick={handleConfirmLogout}>
            Yes
          </Button>,
        ]}
      >
        <p className='font-manrope text-sm'>
          Are you still there? <br /> You will be logged out in <b>{countdown}</b> seconds. Click <b>"Yes"</b> to stay logged in.
        </p>
      </Modal>
    </>
  );
};

export default AutoLogout;
