import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../CSS/checkout.css";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const cartItems = useSelector((state) => state.cart.items);

 const totalPrice = cartItems.reduce(
   (sum, item) => sum + item.product.price * item.quantity,
   0,
 );

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    addressLine: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // Load Razorpay SDK
  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {

     

      if (cartItems.length === 0) {
        return toast.error("Cart is Empty");
      }
   

    const loaded = await loadScript();

    if (!loaded) {
      return toast.error("Unable to load Razorpay");
    }

    try {
      // Create Razorpay Order
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/project1/payment/create-order`,
        {
          amount: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "My Shopping Store",

        description: "Order Payment",

        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verify = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/project1/payment/verify-payment`,
              {
                razorpay_payment_id: response.razorpay_payment_id,

                razorpay_order_id: response.razorpay_order_id,

                razorpay_signature: response.razorpay_signature,

                products: cartItems,

                totalPrice,

                address,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

           if (verify.data.success) {
             dispatch(clearCart());

             toast.success("Payment Successful");

             navigate("/order-success", {
               replace: true,
               state: {
                 order: verify.data.order,
               },
             });
           }
          } catch (error) {
              toast.error("payment verification failed!");

              toast.error(
                error.response?.data?.message || "Payment Verification Failed",
              );
          }
        },

        prefill: {
          name: address.fullName,

          contact: address.phone,
        },

        theme: {
          color: "#16A34A",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    } catch (error) {
      toast.error("Payment Failed");
      console.log(error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <h3>Order Summary</h3>

      {cartItems.map((item) => (
        <div
          key={item._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>{item.product.title} × {item.quantity}</span>

          <span>₹ {item.product.price * item.quantity}</span>
        </div>
      ))}

      <hr />

      <h2>Total : ₹ {totalPrice}</h2>

      <button
        onClick={handlePayment}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;
