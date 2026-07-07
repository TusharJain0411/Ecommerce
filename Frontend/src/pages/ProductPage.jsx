import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsItem from "../components/ProductItem";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
     

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/project1/products`);

     

      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container-product ">
      <div className="row g-2">
        {products.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4"
            key={product._id}
          >
            <ProductsItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
