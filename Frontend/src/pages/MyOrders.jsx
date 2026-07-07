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
    return <h3 style={{ color: "#fff", textAlign: "center" }}>Loading...</h3>;
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
