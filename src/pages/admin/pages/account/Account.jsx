import React, { useEffect, useState } from 'react';
import GetToken from '../../../../context/GetToken';
import useAdminStore from '../../../../store/adminStore';
import "./Account.css"
import { Image } from 'antd';
import { baseUrl } from '../../../../api/api';

export default function Account() {
  const csrfToken = GetToken();
  const { myAccountData, fetchMyAccount, deleteParticipant, updateParticipant, setCsrfToken } = useAdminStore();

  console.log("my account:", myAccountData)

  useEffect(() => {
    fetchMyAccount();
    setCsrfToken(csrfToken);
  }, [fetchMyAccount, setCsrfToken, csrfToken]);

  return (
    <div className='accountContainer'>
       <div className='accountHeader'>
         <h1 className='accountTitle'>Account</h1>
       </div>

       <div className='accountDetails'>
           <p className='accountText'>Username: <b> {myAccountData?.username || ""}</b></p>
           <p className='accountText'>First Name: <b> {myAccountData?.first_name || ""}</b></p>
           <p className='accountText'>Last Name: <b> {myAccountData?.last_name || ""}</b></p>
           <p className='accountText'>Email Address: <b> {myAccountData?.email || ""}</b></p>
     
       </div>
    </div>
  )
}
