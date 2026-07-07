import React, { useState } from 'react'
import Login from '../components/Login';
import Register from '../components/Register';
import { useNavigate } from 'react-router-dom';


function Login_Register() {

    const [isLogin,setIsLogin]=useState(true);
   const navigate=useNavigate();
    const handleLoginToRegisterSwitch=()=>{
        setIsLogin(false);
    }
    const handleRegisterToLoginSwitch=()=>{
        setIsLogin(true);
    }
  return (
    <>
      <div
        className={`container-LR  ${isLogin ? "login-chnage" : "register-change"}`}
      >
        <div className="tabs">
          <div className={`slider ${!isLogin ? "right" : ""}`}></div>
          <button className="tab active" onClick={handleRegisterToLoginSwitch}>
            Sign In
          </button>
          <button className="tab" onClick={handleLoginToRegisterSwitch}>
            Register
          </button>
        </div>

        <div>{isLogin ? <Login /> : <Register />}</div>
        <div className="switch ">
          {isLogin ? <span>New User?</span> : <span>Already User?</span>}
          <button
            className={`${isLogin ? "new" : "old"}`}
            onClick={
              isLogin
                ? handleLoginToRegisterSwitch
                : handleRegisterToLoginSwitch
            }
          >
            {isLogin ? "Register Now" : "Sign In"}
          </button>
        </div>
        <div className="text-white d-flex gap-2 justify-content-center align-items-center mt-3">
          <span>Admin Page</span>{" "}
          <button
            className="border-0"
            style={{ background: "none", color: "#c4b5fd",fontWeight:"600" }}
            onClick={()=>{navigate("/adminlogin")}}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login_Register
