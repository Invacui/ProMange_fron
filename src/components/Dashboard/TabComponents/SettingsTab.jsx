import React, { useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { DashboardContext } from '../../../services/DashboardContext';
import {DataUpdater, showToast} from '../../../services/DataHandler';
import "../../../style/settings_tab.css"
const SettingsTab = () => {
  const {user_data,setRefetch,refetch} = useContext(DashboardContext)

  const [showPassword, setShowPassword] = useState(false);//password state
  const [showcPassword, setShowcPassword] = useState(false); //Cpassword state
  const [formData, setFormData] = useState({name: user_data.name}); //Store the form data
//Toggle Password Field value
const handleTogglePassword = (type) => {
  if (type === "password") {
    setShowPassword(!showPassword);
  } else if (type === "cpassword") {
    setShowcPassword(!showcPassword);
  }
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  // Ensure that e.target is an input field before accessing its value
  if (name && value !== undefined) {
    const newFormData = {
      ...formData,
      [name]: value
    };
    console.log('New Form Data:', newFormData);
    setFormData(newFormData);
  }
}; 
const handleAuthSubmit = async (e) => {
  e.preventDefault();
  console.log("BEFORE SENDING___>>>", formData);
  if (!((formData.oldpassword === "") ^ (formData.newpassword === ""))) {
    if (!(formData.oldpassword && formData.newpassword)) {
      DataUpdater(formData,refetch,setRefetch);
    } else {
      showToast(
        "Please fill out both old password and new password fields.",
        "error"
      );
    }
  } else {
    DataUpdater(formData);
  }
}; 
  return (
    <div className='SettingsTab_main_body'>
      <div className="SettingsTab_sub_body">
        <h2>Settings</h2>
        <div className="SettingsTab_form">
        <form action="/dashboard" onChange={(e)=>{handleInputChange(e)}} method="post">
              {/*Toggle Auth */}
              <input type="text" name="name" id="name" className='authForm_input' placeholder={user_data.name} defaultValue={user_data.name} /><br />
              <span className='passwordField'>
              <input type={showPassword ? 'text' : 'password'} name="oldpassword" id="password" placeholder='Old Password' className='authForm_input' />
               <i className={` fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={()=>handleTogglePassword("password") }></i>
               </span>
               <br />
              {/*Toggle Auth */}
              <span className='passwordField' >
              <input type={showcPassword ? 'text' : 'password'}  name="newpassword" id="cpassword" className='authForm_input' placeholder='New Password'/>
              <i className={` fa-regular ${showcPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick ={()=>handleTogglePassword("cpassword") } ></i>
              </span>
              <br />
              <button id="auth_submit" className='authForm_input' onClick={(e) => handleAuthSubmit(e)} >Update</button>
            </form>
        </div>
      </div>
    <ToastContainer/>
    </div>
  )
}

export default SettingsTab


//add toast
//add old pass cant be same as new pass cant be empty mini 8 char
//logout once token has expired