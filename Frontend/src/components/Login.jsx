import React, { useState,useRef,useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../services/authAPI";
import toast from "react-hot-toast";

import { useDispatch,useSelector } from "react-redux";
import { loginSuccess, setError,clearMessages } from "../redux/slices/userSlice";

function Login() {

  const dispatch = useDispatch();
  const { error, success, isLoggedIn } = useSelector((state) => state.user);
const navigate=useNavigate();
  const inputs = useRef([]);
  const submitBtn = useRef();
  const [isSubmit,setIsSubmit]=useState(false);
  const [see,setSee]=useState(false)
  ;
const [LoginData,setLoginData]=useState({
  email:"",
  password:""
}
);



const handleKeyDown = (e, index) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    inputs.current[index + 1]?.focus();
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    inputs.current[index - 1]?.focus();
  }

  if (e.key === "Enter") {
    e.preventDefault();


    if (inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    } else {
     
      submitBtn.current.click();
    }
  }
};

   const handlesubmitLogin = async (e) => {
     e.preventDefault();
     setIsSubmit(true);

     const { email, password } = LoginData;

     if (!email || !password) {
       toast.error("All fields are required");
       return;
     }

     try {
       const res = await LoginUser(LoginData);
       localStorage.setItem("token", res.data.token);
       dispatch(loginSuccess(res.data));
       navigate("/home", { replace: true });

     } catch (error) {
       const message = error.response?.data?.message || "Login failed";

       dispatch(setError(message));
     }
   };

const handleChange=(e)=>{
setLoginData({...LoginData,[e.target.name]:e.target.value});
}
  const handleShowPassword=(e)=>{
    e.preventDefault();
    setSee(!see);
  }
 useEffect(() => {
   if (error) {
     toast.error(error);
     dispatch(clearMessages());
   }

   if (success) {
     toast.success(success);
     dispatch(clearMessages());

     setLoginData({
       email: "",
       password: "",
     });
   }
 }, [error, success,dispatch]);



  return (
    <>
      <form className="form login">
        <h2>Welcome Back</h2>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          ref={(el) => (inputs.current[0] = el)}
          onKeyDown={(e) => handleKeyDown(e, 0)}
        />
        {isSubmit && LoginData.email.length == 0 && (
          <p style={{ color: "red", fontSize: "11px" }}>Fill Email</p>
        )}

        <div className="passwordShow">
          <input
            type={see ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={handleChange}
            ref={(el) => (inputs.current[1] = el)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
          />
          {isSubmit && LoginData.password.length == 0 && (
            <p style={{ color: "red", fontSize: "11px" }}>Fill Password</p>
          )}

          <button onClick={handleShowPassword}>
            {see ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </button>
        </div>
        <button className="sbt-btn" ref={submitBtn} onClick={handlesubmitLogin}>
          {" "}
          Sign in
        </button>
      </form>
    </>
  );
}

export default Login
