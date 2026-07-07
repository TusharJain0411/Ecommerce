import './App.css'
import {BrowserRouter,  Route, Routes } from "react-router-dom"
import Login_Register from './pages/Login_Register'
import "./CSS/Login_Register.css"
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist"
import "./CSS/Home.css";
import { Toaster } from "react-hot-toast";
import "./CSS/Navbar.css"
import "./CSS/Product.css" 
import "./CSS/Cart.css"
import "./CSS/Common.css"
import "./CSS/wishlist.css"
import { setCart } from "./redux/slices/cartSlice";
import { getCart } from "./services/cartAPI";
import { getWishlist } from './services/wishlistAPI';
import {setOrders} from "./redux/slices/orderSlice"
import {  useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import AdminLoginPage from './Admin/Pages/AdminLoginPage';
import AdminDashboard from './Admin/Pages/AdminDashboard';
import AdminProtectedRoute from './Admin/components/AdminProtectedRoute';
import Products from './Admin/components/Products';
import Profile from "./Admin/components/Profile";
import Dashboard from "./Admin/components/Dashboard";
import AdminList from "./Admin/components/AdminList";
import Orders from './Admin/components/Orders';
import AddProduct from './Admin/components/AddProduct';
import AddAdmin from './Admin/components/AddAdmin';
import ProductDetails from './Admin/components/ProductDetails';
import UserProfile from "./pages/UserProfile";
import UserProductDetails from './pages/UserProductDetails';
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import { setWishlist } from "./redux/slices/wishlistSlice";
import MyOrders from './pages/MyOrders';

function App() {
const dispatch = useDispatch();

const { isLoggedIn } = useSelector((state) => state.user);
const items = useSelector((state) => state.cart.items);

const firstSyncSkip = useRef(true);

useEffect(() => {
  fetchCart();
}, []);

const fetchCart = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const { data } = await getCart(token);

    dispatch(setCart(data.cart.items));
  } catch (err) {
    console.log(err);
  }
};



 useEffect(() => {
   async function loadWishlist() {
     try {
       const res = await getWishlist();
       dispatch(setWishlist(res.data.wishlist));
     } catch (err) {
       if (err.response?.status === 401) {
         localStorage.removeItem("token");
         localStorage.removeItem("currentUser");

         window.location.href = "/";
         return;
       }

       console.log(err);
     }
   }

   if (isLoggedIn) {
     loadWishlist();
   }
 }, [isLoggedIn]);


 useEffect(() => {
   const fetchOrders = async () => {
     try {
       const user = JSON.parse(localStorage.getItem("currentUser"));

       if (!user) {
         dispatch(setOrders([]));
         return;
       }

       const response = await axios.get(
         `${import.meta.env.VITE_BASE_URL}/project1/order/${user._id}`,
       );

       dispatch(setOrders(response.data.orders));
     } catch (error) {
       console.log(error);
       dispatch(setOrders([]));
     }
   };

   if (isLoggedIn) {
     fetchOrders();
   }
 }, [isLoggedIn, dispatch]);
  
useEffect(() => {
  if (!isLoggedIn) {
   
    dispatch(setWishlist([]));
    dispatch(setOrders([]));

    firstSyncSkip.current = true;
  }
}, [isLoggedIn, dispatch]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/adminlogin" element={<AdminLoginPage />} />

          <Route path="/" element={<Login_Register />} />

          <Route
            path="/admin/Products"
            element={
              <AdminProtectedRoute>
                <AdminDashboard>
                  <Products />
                </AdminDashboard>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <AdminProtectedRoute>
                <AdminDashboard>
                  <ProductDetails />
                </AdminDashboard>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/Profile"
            element={
              <AdminProtectedRoute>
                <AdminDashboard>
                  <Profile />
                </AdminDashboard>
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard>
                  <Dashboard />
                </AdminDashboard>
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/adminlist"
            element={
              <AdminProtectedRoute>
                <AdminDashboard>
                  <AdminList />
                </AdminDashboard>
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminProtectedRoute>
                <AdminDashboard>
                  <Orders />
                </AdminDashboard>
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/addproduct"
            element={
              <AdminProtectedRoute>
                <AdminDashboard>
                  <AddProduct />
                </AdminDashboard>
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/addadmin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard>
                  <AddAdmin />
                </AdminDashboard>
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <UserProductDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userProfile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myorder"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
