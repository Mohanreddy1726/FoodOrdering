/* eslint-disable no-unused-vars */
import React, {useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setShowLogin}) => {
    const [currentState,setCurrentState] = useState('Sign Up')
    const {url,setToken} = useContext(StoreContext);
    // State to hold form data
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // Update the state with the new value
        setData({
            ...data,
            [name]: value
        });
    }

    const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url;
        if (currentState === "Login") {
            newUrl += '/api/user/login'
        } else {
            newUrl += '/api/user/register'
            
        }
        const response = await axios.post(newUrl, data)
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message || "An error occurred. Please try again.");
        }
    }
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2> {currentState} </h2>
                <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
            </div>
            <div className="login-popup-inputs">
                { currentState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> }
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
                <button type='submit'> {currentState === "Sign Up" ? 'Create Account' : 'Login'} </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currentState === "Login"
                    ? <p>Create a new account ? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                    :  <p>Already have an account ? <span  onClick={() => setCurrentState('Login')}>Login here</span></p> 
                }
        </form>
    </div>
  )
}

export default LoginPopup
