import React, { useState } from 'react'
import './css/LoginSignup.css';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form'


const LoginSignUp = () => {
  const [state, setState] = useState("Sign Up");
  const  { authLogin } = useAuth();
  const { register, handleSubmit, handleState: {errors} } = useForm();



  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  // Handle form submission 

  const login = async () => {

    let responseData;
    await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)
    

    if (responseData.success) {
      authLogin(responseData);
      window.location.replace("/")
    }
    else {
      alert(responseData.error)
    }
  }

  const signUp = async () => {  
    let responseData;
    await fetch('http://localhost:4000/user/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      localStorage.setItem('auth-user', JSON.stringify(responseData.user));
      window.location.replace("/")
    }
    else {
      alert(responseData.error)
    }
  }

  return (
    <>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === "Sign Up" 
              ? <input name='username' value={formData.username} onChange={handleChange} type="text" placeholder='Your Name' required /> 
              : <></>
            }
            <input name='email' value={formData.email} onChange={handleChange}  type="email" placeholder='Email Address' required />
            <input name='password' value={formData.password} onChange={handleChange} type="password" placeholder='Password' required />
          </div>
          <button onClick={() => {state === "Login" ? login() : signUp();}}>Continue</button>
          {state === "Sign Up" 
            ? <p className="loginsignup-login">Already have an account? <span onClick={() => {setState("Login")}}>Login here</span></p>
            : <p className="loginsignup-login">Create an account? <span onClick={() => {setState("Sign Up")}}>Click here</span></p>
          }
          
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        </div>
      </div>
    </> 
  )
}

export default LoginSignUp
