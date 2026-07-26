import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyUserToken } from "../services/authAPI";
import Navbar from "./Navbar";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);


  useEffect(() => {
  const verify = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsValid(false);
      setLoading(false);
      return;
    }

    try {
      await verifyUserToken(token);
      setIsValid(true);
    } catch {
      localStorage.removeItem("token");
      setIsValid(false);
    }

    setLoading(false);
  };

  verify();
}, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center position-absolute top-50"
        style={{ left: "45%" }}
      >
        <button
          class="btn bg-transparent p-1 m-0"
          type="button"
          disabled
          style={{ color: "#7c3aed" }}
        >
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
        <button
          class="btn bg-transparent p-1 m-0"
          type="button"
          disabled
          style={{ color: "#7c3aed" }}
        >
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
        <button
          class="btn bg-transparent p-1 m-0"
          type="button"
          disabled
          style={{ color: "#7c3aed" }}
        >
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  return <>
  <Navbar/>
  {children}</>;
};

export default ProtectedRoute;
