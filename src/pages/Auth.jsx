import React, { useState } from 'react'
import auth_logo from "../assets/auth_logo.png"
import "../style/auth.css"
import '@fortawesome/fontawesome-free/css/all.css';
import handleFormSubmit from '../services/AuthHandler';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [authType,setAuthType ] = useState(true); //Login Signup Switch
  const [showPassword, setShowPassword] = useState(false);//password state
  const [showcPassword, setShowcPassword] = useState(false); //Cpassword state
  const [formData, setFormData] = useState({ }); //Store the form data
  const navigate = useNavigate();

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
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };  
  function handleNavigate(){
    if(authType === false){setTimeout(() => {
      window.location.href='/dashboard';
    },3000);}
    else{
      setAuthType(false)      //Nav to Login Panel After Successfull creation of user
    }
  }
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
   const captured_data = await handleFormSubmit(
      (authType?"signup":"login"),
      "POST",
      formData,
      );
      if(captured_data){
      handleNavigate();
    }else{
      
    }  
    };
  return(
    <div className="auth_mainbody">
        <div id="auth_sub_box_one">
          <img src={auth_logo} alt="auth_logo"/>
          <h1>Welcome aboard my friend</h1>
            <p> Just a couple of clicks and we start. </p>
        </div>
        <div id="auth_sub_box_two">
            <h1>
              {authType ? "Signup" : "Login"}
            </h1>
            <form action="/dashboard" onChange={(e)=>{handleInputChange(e)}} method="post">
              {/*Toggle Auth */}
              <input type="text" name="name" id="name" placeholder='Name' className='authForm_input' style={{display:`${authType ? "" :"none" }`}} /><br />
              <input type="email" name="email" id="email" placeholder='Email'  className='authForm_input'/><br />
              <span className='passwordField'>
              <input type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder='Password' className='authForm_input' />
               <i className={` fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={()=>handleTogglePassword("password") }></i>
               </span>
               <br />
              {/*Toggle Auth */}
              <span className='passwordField' style={{display:`${authType ? "" :"none" }`}}>
              <input type={showcPassword ? 'text' : 'password'}  name="cpassword" id="cpassword" className='authForm_input' placeholder='Confirm Password'/>
              <i className={` fa-regular ${showcPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick ={()=>handleTogglePassword("cpassword") } ></i>
              </span>
              <br />
              <button id="auth_submit" className='authForm_input' onClick={(e) => handleAuthSubmit(e)}>Submit</button>
            </form>
            <div className='change_auth_type'>
                Have an account
                <button onClick={()=>{setAuthType(!authType)}}>{authType?"Login":"Signup"}</button>
            </div>
              
        </div>
        <ToastContainer richColors/>
    </div>
  );
};

export default Auth