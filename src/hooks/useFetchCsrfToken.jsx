import { useEffect } from "react"
import useCsrfTokenStore from "../store/csrfTokenStore"
import { message } from "antd";
import axios from "axios";
import { getCsrfToken } from "../api/api";

export default function useFetchCsrfToken() {
  const setCsrfToken = useCsrfTokenStore((state) => state.setCsrfToken);
  
  useEffect(() => {
    const fetchCsrfToken = async () => {
        try {
            const res = await axios.get(getCsrfToken)
            setCsrfToken(res.data['csrf-token']);
        } catch (error) {
            message.error('Failed to fetch CSRF token:');
            console.log('Failed to fetch CSRF token:', error);
        }
    }

    fetchCsrfToken();

  }, [setCsrfToken])

}
