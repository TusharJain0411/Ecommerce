import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";
import { getProfile, logoutUser } from "../services/authAPI";
import {useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import "../CSS/Navbar.css"

import profile_img from "../assets/accountImg.png";


function Navbar() {
     const navigate = useNavigate();
const [user,setUser]=useState({});
const [isOpen,setIsOpen]=useState(false);
const dispatch = useDispatch();
const items = useSelector((state) => state.cart.items);

const handleWishlist=()=>{
  setIsOpen(false)
  navigate("/wishlist");
}



const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await logoutUser(token);
    }

    dispatch(logout());

    navigate("/", { replace: true });
  } catch (err) {
    console.log(err);
  }
};



const handleAccount=()=>{
  setIsOpen(!isOpen);
}

const handleCart=()=>{
  navigate("/cart");
  setIsOpen(false);
}

const handleLogo=()=>{
  setIsOpen(false);
  navigate("/home");
}

const handleProfile=()=>{
  setIsOpen(false);
  navigate("/userprofile")
}

const handleOrder=()=>{
  setIsOpen(false);
  navigate("/myorder");
}


useEffect(() => {
  const token = localStorage.getItem("token");

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/project1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUser(res.data.user);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
 

  return (
    <>
      <nav className="navbar ">
        <button className="logo" onClick={handleLogo}>
          E-Com
        </button>

        <div className="buttonCls">
          <button className="Cart" onClick={handleCart}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>{items.length}</span>
          </button>

          <button className="userIcon" onClick={handleAccount}>
            <img src={user?.profileImage ||profile_img} alt={user?.name} />
          </button>
        </div>

        {isOpen ? (
          <div className="userSection">
            <img src={user?.profileImage} alt="" />
            <span>{user?.name}</span>
            <p>{user?.email}</p>
            <button className="wishlistBtn" onClick={handleProfile}>
              Profile
            </button>
            <button className="wishlistBtn" onClick={handleWishlist}>
              Wishlist
            </button>
            <button className="wishlistBtn" onClick={handleOrder}>
              Orders
            </button>

            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          ""
        )}
      </nav>
    </>
  );
}

export default Navbar
