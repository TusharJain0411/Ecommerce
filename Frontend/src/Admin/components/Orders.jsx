import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/orders.css";
import { getAllOrders } from "../../services/adminOrderDetailAPI";
import OrderSkeleton from "./OrderSkeleton";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const { data } = await getAllOrders(token);

    setOrders(data.orders);
  } catch (err) {
    console.log(err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchOrders();
  }, []);

 if (loading) {
   return (
     <div className="admin-orders">
       <div className="skeleton-order sk-heading"></div>

       <div className="orders-grid">
         {[...Array(4)].map((_, index) => (
           <OrderSkeleton key={index} />
         ))}
       </div>
     </div>
   );
 }

  return (
    <div className="admin-orders">
      <h2>Customer Orders</h2>

      {orders.length === 0 ? (
        <h3 className="no-order">No Orders Found</h3>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="card-top">
                <div>
                  <h3>{order.user?.name}</h3>
                  <span className={`status ${order.paymentStatus}`}>
                    {order.paymentStatus.toUpperCase()}
                  </span>
                </div>

                <p className="date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="user-details">
                <div>
                  <span>Email</span>
                  <p>{order.user?.email}</p>
                </div>

                <div>
                  <span>Phone</span>
                  <p>{order.user?.phone}</p>
                </div>

                <div className="address">
                  <span>Address</span>
                  <p>{order.user?.location}</p>
                </div>
              </div>

              <div className="products">
                {order.items.map((item) => (
                  <div className="product-row" key={item._id}>
                    <img src={item.img} alt={item.title} />

                    <div className="product-info">
                      <h4>{item.title}</h4>
                      <p>₹ {item.price}</p>
                      <p>Qty : {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary">
                <div>
                  <span>Total Items</span>
                  <h4>{order.totalQty}</h4>
                </div>

                <div>
                  <span>Total Price</span>
                  <h4>₹ {order.totalPrice}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
