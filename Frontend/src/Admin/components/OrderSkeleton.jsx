import React from "react";

function OrderSkeleton() {
  return (
    <div className="order-card">
      <div className="card-top">
        <div>
          <div className="skeleton sk-name"></div>
          <div className="skeleton sk-status"></div>
        </div>

        <div className="skeleton sk-date"></div>
      </div>

      <div className="user-details">
        <div>
          <div className="skeleton sk-label"></div>
          <div className="skeleton sk-text"></div>
        </div>

        <div>
          <div className="skeleton sk-label"></div>
          <div className="skeleton sk-text"></div>
        </div>

        <div className="address">
          <div className="skeleton sk-label"></div>
          <div className="skeleton sk-long"></div>
        </div>
      </div>

      <div className="products">
        {[1, 2].map((item) => (
          <div className="product-row" key={item}>
            <div className="skeleton sk-image"></div>

            <div className="product-info">
              <div className="skeleton sk-product"></div>
              <div className="skeleton sk-price"></div>
              <div className="skeleton sk-qty"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="summary">
        <div>
          <div className="skeleton sk-summary-title"></div>
          <div className="skeleton sk-summary-value"></div>
        </div>

        <div>
          <div className="skeleton sk-summary-title"></div>
          <div className="skeleton sk-summary-value"></div>
        </div>
      </div>
    </div>
  );
}

export default OrderSkeleton;
