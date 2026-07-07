import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import accountImg from "../assets/accountImg.png";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  signupSuccess,
  setError,
  clearMessages,
} from "../redux/slices/userSlice";


function Register() {
  
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const inputs = useRef([]);
  const submitBtn = useRef();
const navigate = useNavigate();    
  const [see,setSee]=useState(false);
  const [seeConfirm,setSeeconfirm]=useState(false);
const [registerData,setRegisterData]=useState({
  name:"",
  email:"",
  phone:"",
  location:"",
  password:"",
  confirm_password:""
}
);
const [isSubmit, setIsSubmit] = useState(false);
const [loading, setLoading] = useState(false);
const [preview, setPreview] = useState("");

  const { error, success, isLoggedIn } = useSelector(state => state.user);


  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };


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

const handleChange=(e)=>{
setRegisterData({...registerData,[e.target.name]:e.target.value});
}

const handleShowPassword = (e) => {
   e.preventDefault();
   setSee(!see);
 };

const handleShowConfirmPassword=(e)=>{
  e.preventDefault();
  setSeeconfirm(!seeConfirm);

}

   const handleSubmit = async (e) => {
     e.preventDefault();


     try {
       const formData = new FormData();

     
       formData.append("name", registerData.name);
       formData.append("email", registerData.email);
       formData.append("phone", registerData.phone);
       formData.append("location", registerData.location);
       formData.append("password", registerData.password);
       formData.append("confirm_password", registerData.confirm_password);
       formData.append("userprofile", image); 

       setIsSubmit(true);
       setLoading(true);

          if (!registerData.name|| !registerData.email || !registerData.phone || !registerData.location || !registerData.password || !registerData.confirm_password) {
      toast.error("All fields are required");
      return;}

       if (registerData.password !== registerData.confirm_password) {
         toast.error("Passwords do not match");
         return;
       }
       const res = await axios.post(
         `${import.meta.env.VITE_BASE_URL}/project1/auth/register`,
         formData,
         {
           headers: {
             "Content-Type": "multipart/form-data",
           },
         },
       );
       dispatch(signupSuccess(res.data.message));
       window.location.reload();
       setImage("");
       setPreview("");
     } 
     
     catch (error) {
        dispatch(setError(error.response?.data?.message || "Signup failed"));
     } 
     
     finally {
       setLoading(false);
     }
   };

    useEffect(() => {
       if (image) {
         setPreview(URL.createObjectURL(image));
       }
     }, [image]);


      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearMessages());
        }

        if (success) {
          toast.success(success);
          dispatch(clearMessages());

          navigate("/");
        }
      }, [error, success,dispatch]);

        useEffect(() => {
          if (isLoggedIn) {
            navigate("/home");
          }
        }, [isLoggedIn,navigate]);
   
  return (
    <div>
      <form className="form register">
        <h2>Create Account</h2>

        {/* <div className="text-center mb-3">
          <img
            src={preview ? preview : accountImg}
            alt="profile"
            className="profile-img"
          />
        </div> */}

       
          <input type="file" accept="image/*" onChange={setProfile} />
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            autoComplete="name"
            onChange={handleChange}
            ref={(el) => (inputs.current[0] = el)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
          />
          {isSubmit && registerData.name.length == 0 && (
            <p style={{ color: "red", fontSize: "11px" }}>Fill Name</p>
          )}

          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            ref={(el) => (inputs.current[1] = el)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
          />
          {isSubmit && registerData.email.length == 0 && (
            <p style={{ color: "red", fontSize: "11px" }}>Fill Email</p>
          )}

          <input
            type="text"
            placeholder="Mobile Number"
            name="phone"
            autoComplete="phone"
            onChange={handleChange}
            ref={(el) => (inputs.current[2] = el)}
            onKeyDown={(e) => handleKeyDown(e, 2)}
          />
          {isSubmit && registerData.phone.length == 0 && (
            <p style={{ color: "red", fontSize: "11px" }}>Fill Phone</p>
          )}

          <input
            type="text"
            placeholder="Location"
            name="location"
            autoComplete="location"
            onChange={handleChange}
            ref={(el) => (inputs.current[3] = el)}
            onKeyDown={(e) => handleKeyDown(e, 3)}
          />
          {isSubmit && registerData.location.length == 0 && (
            <p style={{ color: "red", fontSize: "11px" }}>Fill Location</p>
          )}

          <div className="passwordShow">
            <input
              type={see ? "text" : "password"}
              placeholder="Password"
              name="password"
              autoComplete="new-password"
              onChange={handleChange}
              ref={(el) => (inputs.current[4] = el)}
              onKeyDown={(e) => handleKeyDown(e, 4)}
            />
            <button onClick={handleShowPassword}>
              {see ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>
          </div>
          {isSubmit && registerData.password.length == 0 && (
            <p style={{ color: "red", fontSize: "11px" }}>Fill Password</p>
          )}

          <div className="passwordShow">
            <input
              type={seeConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirm_password"
              autoComplete="new-password"
              onChange={handleChange}
              ref={(el) => (inputs.current[5] = el)}
              onKeyDown={(e) => handleKeyDown(e, 5)}
            />
            <button onClick={handleShowConfirmPassword}>
              {seeConfirm ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>
          </div>
          {isSubmit && registerData.confirm_password.length == 0 && (
            <p style={{ color: "red", fontSize: "11px" }}>
              Fill Confirm Password
            </p>
          )}
       
        <button className="sbt-btn" ref={submitBtn} onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register
