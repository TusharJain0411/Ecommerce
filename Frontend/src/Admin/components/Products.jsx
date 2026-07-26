import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminProductItem from "./AdminProductItem";
import "../CSS/adminProduct.css";
import ProductSkeleton from "./ProductSkeleton";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate("/admin/addproduct");
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/project1/products`,
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

 if (loading) {
   return (
     <div className="products-page">
       <div className="products-header">
         <div>
           <div className="skeleton skeleton-heading"></div>
           <div className="skeleton skeleton-subheading"></div>
         </div>

         <div className="skeleton skeleton-add-btn"></div>
       </div>

       <div className="products-grid">
         {[...Array(8)].map((_, index) => (
           <ProductSkeleton key={index} />
         ))}
       </div>
     </div>
   );
 }

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h2>Products</h2>
          <p>Manage your store products</p>
        </div>

        <button className="add-product-btn" onClick={handleAddProduct}>
           Add Product
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <AdminProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
