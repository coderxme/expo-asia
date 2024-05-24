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
           <p className='accountText'>Full Name: <b> {myAccountData?.participant_details?.name || ""}</b></p>
           <p className='accountText'>Email Address: <b> {myAccountData?.participant_details?.email || ""}</b></p>
           <p className='accountText'>Designation: <b> {myAccountData?.participant_details?.designation || ""}</b></p>
           <p className='accountText'>Company: <b> {myAccountData?.participant_details?.company_org_details?.name || ""}</b></p>
           <p className='accountText'>Company Type: <b> {myAccountData?.participant_details?.company_org_details?.company_org_type_details?.name || ""}</b></p>
           <p className='accountText'>Phone No: <b> {myAccountData?.participant_details?.phone_no || ""}</b></p>
     
     
       </div>
    </div>
  )
}
