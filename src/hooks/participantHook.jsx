import { useEffect } from "react";
import  useAdminStore from "../store/adminStore";
import GetToken from "../context/GetToken";

export const useFetchData = () => {
    const {
        fetchParticipants,
        fetchMilitaryBranch,
        fetchCompany,
        fetchForum,
        setCsrfToken,
    } = useAdminStore();

    const csrfToken = GetToken();

    useEffect(() => {
        fetchParticipants();
        fetchCompany();
        fetchMilitaryBranch()
        fetchForum();
        setCsrfToken(csrfToken);
    }, [fetchParticipants, fetchCompany, fetchMilitaryBranch, fetchForum, setCsrfToken, csrfToken])
};