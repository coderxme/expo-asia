import useAdminStore from '../../../../store/adminStore';
import "./Account.css"

export default function Account() {
  const { myAccountData } = useAdminStore();

  console.log("my account:", myAccountData)


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
