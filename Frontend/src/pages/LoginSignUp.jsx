import React, { useState } from 'react'
import './css/LoginSignup.css';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';


const LoginSignUp = () => {
  const [state, setState] = useState("Sign Up");
  const { authLogin } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const BASE_URL = import.meta.env.VITE_BASE_URL;


  // Handle form submission 
  const onSubmit = async (data) => {
    let responseData;
    const url = state === "Login"
      ? `${BASE_URL}user/login`
      : `${BASE_URL}user/signup`;

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => responseData = data);

    if (responseData.success) {
      if (state === "Login") {
        authLogin(responseData);
      } else {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('auth-user', JSON.stringify(responseData.user));
      }
      window.location.replace("/");
    } else {
      toast.error(responseData.error)
    }
  }

  return (
    <>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <form className="loginsignup-fields" onSubmit={handleSubmit(onSubmit)}>
            <div>
              {state === "Sign Up" && (
                <>
                  <input
                    {...register('username', { required: 'Name is required' })}
                    type="text"
                    placeholder='Your Name' />
                  {errors.username && (<p className="error">{errors.username.message}</p>)}
                </>
              )}
            </div>
            
            <div>
              <input
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                type="email"
                placeholder='Email Address' />
              {errors.email && (<p className='error'>{errors.email.message}</p>)}
            </div>

            <div>
              <input {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: "Min 6 characters" }
              })}
                type="password"
                placeholder="Password"
              />
              {errors.password && (<p className="error">{errors.password.message}</p>)}
            </div>

            <button type="submit">Continue</button>
          </form>

          {state === "Sign Up"
            ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>
            : <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>
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
