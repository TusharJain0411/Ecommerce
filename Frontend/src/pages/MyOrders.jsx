import React, { useEffect, useState } from "react";
import "../CSS/myorder.css";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/project1/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
       
      setOrders(data.orders || []);
    } catch (err) {
      console.log("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

 if (loading) {
   return (
     <div className="orders-page">
       <div className="skeleton-order sk-page-title"></div>

       <div className="orders-container">
         {[...Array(6)].map((_, index) => (
           <div className="order-card" key={index}>
             <div className="skeleton-order sk-order-img"></div>

             <div className="order-infos">
               <div className="skeleton-order sk-order-title"></div>
               <div className="skeleton-order sk-order-price"></div>
               <div className="skeleton-order sk-order-status"></div>
               <div className="skeleton-order sk-order-qty"></div>
             </div>
           </div>
         ))}
       </div>
     </div>
   );
 }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p style={{ color: "#ccc" }}>No orders found</p>
      ) : (
        <div className="orders-container">
           {orders.map((order) => {
            const item = order.items?.[0] || {};

            return (
              <div className="order-card" key={order._id}>
                <img src={item.img || "/placeholder.png"} alt="product" />

                <div className="order-infos">
                  <h3>{item.title || "Product Name"}</h3>

                  <p>₹{item.price || 0}</p>

                  <p>
                    Status:{" "}
                    <span className={`status ${order.paymentStatus}`}>
                      {order.paymentStatus}
                    </span>
                  </p>

                  <p>Qty: {order.totalQty || 0}</p>
                </div>

                
              </div>
            );
          })} 

      
        </div>
      )}
    </div>
  );
}

export default MyOrders;
