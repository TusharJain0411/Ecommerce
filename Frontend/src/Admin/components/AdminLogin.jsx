import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginAdmin } from "../../services/adminAuth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  setError,
  clearMessages,
} from "../../redux/slices/adminSlice";

import "../CSS/adminLogin.css";

function AdminLogin() {
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.admin);

  const navigate = useNavigate();

  const inputs = useRef([]);
  const submitBtn = useRef();

  const [see, setSee] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

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

  const handleChange = (e) => {
    setLoginData({
      ...LoginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setSee(!see);
  };

  const switchToUserPage = () => {
    navigate("/");
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    setIsSubmit(true);

    if (!LoginData.email || !LoginData.password) return;

    try {
      const res = await LoginAdmin(LoginData);

      localStorage.setItem("adminToken", res.data.token);

      dispatch(loginSuccess(res.data));

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || "Login Failed";
      dispatch(setError(message));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }

    if (success) {
      toast.success(success);
      dispatch(clearMessages());
    }
  }, [error, success, dispatch]);

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>Admin Login</h2>

        <p className="admin-login-subtitle">Login to manage your dashboard</p>

        <form className="admin-login-form">
          <div className="admin-input-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
              ref={(el) => (inputs.current[0] = el)}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />

            {isSubmit && !LoginData.email && (
              <small>Please enter your email.</small>
            )}
          </div>

          <div className="admin-input-group">
            <div className="admin-password-box">
              <input
                type={see ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                ref={(el) => (inputs.current[1] = el)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
              />

              <button onClick={handleShowPassword}>
                {see ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
            </div>

            {isSubmit && !LoginData.password && (
              <small>Please enter your password.</small>
            )}
          </div>

          <button
            className="admin-login-btn"
            ref={submitBtn}
            onClick={handleSubmitLogin}
          >
            Sign In
          </button>

          <div className="admin-switch-user">
            <span>Want to visit User Site?</span>

            <button type="button" onClick={switchToUserPage} >
              User Website
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
