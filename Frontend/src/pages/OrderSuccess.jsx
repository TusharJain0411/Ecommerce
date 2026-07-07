import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../CSS/orderSuccess.css";

function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <div className="success-circle">✓</div>

        <h1>Payment Successful!</h1>

        <p className="success-msg">
          Thank you! Your order has been placed successfully.
        </p>

        {order && (
          <div className="order-info">
            <div className="info-row">
              <span>Order ID</span>
              <strong>{order._id}</strong>
            </div>

            <div className="info-row">
              <span>Payment Status</span>
              <span className="paid-badge">Paid</span>
            </div>

            <div className="info-row">
              <span>Total Amount</span>
              <strong>₹ {order.totalPrice}</strong>
            </div>

            <div className="info-row">
              <span>Total Items</span>
              <strong>{order.totalQty}</strong>
            </div>
          </div>
        )}

        <div className="success-buttons">
          <Link to="/myorder" className="primary-btn">
            View My Orders
          </Link>

          <Link to="/home" className="secondary-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
