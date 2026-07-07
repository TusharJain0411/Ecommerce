import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, removeWishlist } from "../services/wishlistAPI";
import { setWishlist } from "../redux/slices/wishlistSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addCart } from "../services/cartAPI";
import { setCart } from "../redux/slices/cartSlice";

function ProductsItem({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.user);
  const items = useSelector((state) => state.wishlist.items);

  const isWishlisted = items.some(
    (item) => item.productId?._id === product._id,
  );

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };


  const handleAddToCart = async (e) => {
    e.stopPropagation();

    try {
     

      const token = localStorage.getItem("token");

      const { data } = await addCart(product._id, token);

      dispatch(setCart(data.cart.items));

      toast.success("Added to cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };


  const handleAddToWishlist = async (e) => {
    e.stopPropagation();

    try {
      const res = await addWishlist(product._id);

      dispatch(setWishlist(res.data.wishlist));
      toast.success("Added to wishlist");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFromWishlist = async (e) => {
    e.stopPropagation();

    try {
      const res = await removeWishlist(product._id);

      dispatch(setWishlist(res.data.wishlist));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`product-card ${product.stock <= 0 ? "out-of-stock ofs-label" : ""}`}
      onClick={()=>{if(product.stock>0){handleCardClick()}}}
    >
      <div className="image">
        <img src={product.img} alt={product.title} />
      </div>

      <div className="card-body">
        <span>{product.title}</span>
        <p>{product.category}</p>
        <p>₹{product.price}</p>

        <button
          className="cartBtm"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          Add to Cart
        </button>

        <button
          className={isWishlisted ? "wish-active" : "wish"}
          onClick={
            isWishlisted ? handleRemoveFromWishlist : handleAddToWishlist
          }
        >
          {isWishlisted ? (
            <i className="fa-solid fa-heart"></i>
          ) : (
            <i className="fa-solid fa-heart-circle-plus"></i>
          )}
        </button>

        <p
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "red",
            marginTop: "1rem",
          }}
        >
          {product.stock <= 9 && product.stock > 5 ? "Only few left" : ""}
          {product.stock <= 5 && product.stock>0 ? `Hurry Up! ${product.stock} left` : ""}
        </p>
      </div>
    </div>
  );
}

export default ProductsItem;
