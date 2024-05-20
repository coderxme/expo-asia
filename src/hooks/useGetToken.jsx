import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCsrfToken } from '../api/api';

const useGetToken = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {s
        const response = await axios.get(getCsrfToken);
        setCsrfToken(response.data['csrf-token']);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCsrfToken();
  }, []);

  return csrfToken;
};

export default useGetToken;
