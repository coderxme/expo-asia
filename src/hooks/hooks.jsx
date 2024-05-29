import React, { useEffect, useState } from "react";
import useAdminStore from "../store/adminStore";
import GetToken from "../context/GetToken";

export const useFetchData = () => {
    const {
        fetchParticipantCategory,
        fetchRoles,
        fetchMilitaryBranch,
        fetchUsers,
        fetchForum,
        fetchInvite,
        fetchParticipants,
        fetchBooths,
        fetchBoothAttendee,
        fetchCompany,
        fetchCompanyType,
        fetchEvent,
        fetchEventAttendee,
        fetchMyAccount,

        setCsrfToken,
    } = useAdminStore();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const csrfToken = GetToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await Promise.all([
                    fetchParticipantCategory(),
                    fetchRoles(),
                    fetchMilitaryBranch(),
                    fetchUsers(),
                    fetchForum(),
                    fetchInvite(),
                    fetchParticipants(),
                    fetchBooths(),
                    fetchBoothAttendee(),
                    fetchCompany(),
                    fetchCompanyType(),
                    fetchEvent(),
                    fetchEventAttendee(),
                    fetchMyAccount(),
                ]);
                setCsrfToken(csrfToken);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [
        fetchParticipantCategory, 
        fetchRoles,
        fetchMilitaryBranch,
        fetchUsers,
        fetchForum,
        fetchInvite,
        fetchParticipants,
        fetchBooths,
        fetchBoothAttendee,
        fetchCompany,
        fetchCompanyType,
        fetchEvent,
        fetchEventAttendee,
        fetchMyAccount,
        setCsrfToken, csrfToken]);

    return { isLoading, error };
};


