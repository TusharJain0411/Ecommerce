import React from "react";
import { useNavigate } from "react-router-dom";

function AdminProductItem({ product }) {
  const navigate = useNavigate();

  const shortText =
    product.description.length > 60
      ? product.description.slice(0, 60) + "..."
      : product.description;

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/admin/product/${product._id}`)}
    >
      <div className="product-image">
        <img src={product.img} alt={product.title} />
      </div>

      <div className="product-content">
        <h4>{product.title}</h4>

        <span className="category">{product.category}</span>

        <h3>₹{product.price}</h3>

        <div
          className={`stock ${
            product.stock === 0
              ? "out"
              : product.stock < 10
                ? "low"
                : "available"
          }`}
        >
          {product.stock === 0
            ? "Out of Stock"
            : product.stock < 10
              ? `${product.stock} Left`
              : `${product.stock} In Stock`}
        </div>

        <p>{shortText}</p>

        <button className="view-btn">View Details</button>
      </div>
    </div>
  );
}

export default AdminProductItem;
