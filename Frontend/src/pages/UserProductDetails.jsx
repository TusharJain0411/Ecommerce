
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/UserProductDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, removeWishlist } from "../services/wishlistAPI";
import { setWishlist } from "../redux/slices/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { addCart } from "../services/cartAPI";
import { setCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast"



function UserProductDetails() {
   const items = useSelector((state) => state.wishlist.items);
   
    const [isWishlisted, setIsWishlisted] = useState(false); 
   const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

const navigate=useNavigate();


  useEffect(() => {
    fetchProduct();
  }, [id]);


useEffect(() => {
  if (product) {
    const found = items.some((item) => item.productId?._id === product._id);
    setIsWishlisted(found);
  }
}, [product, items]);

const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await addCart(product._id, token);

    dispatch(setCart(data.cart.items));

    toast.success("Added to cart");
  } catch (err) {
    toast.error(err.response?.data?.message || "Error");
  }
};

  const handleAddToWishlist = async () => {
    try {
      const res = await addWishlist(product._id);

      dispatch(setWishlist(res.data.wishlist));
       setIsWishlisted(true);
       toast.success("Added to Wishlist")
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      const res = await removeWishlist(product._id); // your API

      dispatch(setWishlist(res.data.wishlist));
      setIsWishlisted(false);
    } catch (err) {
      console.log(err);
    }
  };

const handleBack=()=>{
navigate("/home");
}

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/project1/products/${id}`,
      );
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <div className="ProductDetail">
        <div className="img-class">
          <img src={product.img} alt={product.title} />
        </div>

        <div className="product-info">
          <h2>{product.title}</h2>
          <p>{product.category}</p>
          <h4>₹{product.price}</h4>
          <p>{product.description}</p>

          <div className="btns-ProductDetail">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button
              className={
                isWishlisted
                  ? "productDetail-wish-active"
                  : "productDetail-wish"
              }
              onClick={() => {
                isWishlisted
                  ? handleRemoveFromWishlist()
                  : handleAddToWishlist();
              }}
            >
              {isWishlisted ? (
                <i className="fa-solid fa-heart"></i>
              ) : (
                <i className="fa-solid fa-heart-circle-plus"></i>
              )}
            </button>

            <button onClick={handleBack}>Back</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProductDetails;
