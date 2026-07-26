import React from "react";

function ProductSkeleton() {
  return (
    <div className="product-card">
      <div className="image skeleton"></div>

      <div className="card-body">
        <div className="skeleton sk-title"></div>

        <div className="skeleton sk-category"></div>

        <div className="skeleton sk-price"></div>

        <div className="skeleton sk-btn"></div>

        <div className="skeleton sk-heart"></div>

        <div className="skeleton sk-stock"></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
