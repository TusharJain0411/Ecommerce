import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "../services/authAPI";
import ProductPage from "./ProductPage";
import { useDispatch,useSelector } from "react-redux";
import { setCart } from "../redux/slices/cartSlice";


function HomePage() {


const dispatch = useDispatch();


  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await getProfile(token);

        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

 

  return (
    <>
      <ProductPage/>
    </>
  );
}

export default HomePage;
