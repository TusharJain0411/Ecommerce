import React from "react";

function ProductSkeleton() {
  return (
    <div className="product-card">
      <div className="product-image skeleton"></div>

      <div className="product-content">
        <div className="skeleton skeleton-title"></div>

        <div className="skeleton skeleton-category"></div>

        <div className="skeleton skeleton-price"></div>

        <div className="skeleton skeleton-stock"></div>

        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line"></div>

        <div className="skeleton skeleton-btn"></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
