import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { setCart, clearCart } from "../redux/slices/cartSlice";

import {
  updateCartQty,
  removeCartItem,
  clearCartAPI,
} from "../services/cartAPI";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ Increase Qty
  const increaseQty = async (productId, qty) => {
    try {
      const { data } = await updateCartQty(productId, qty + 1, token);
      dispatch(setCart(data.cart.items));
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  // ✅ Decrease Qty
  const decreaseQty = async (productId, qty) => {
    try {
      const { data } = await updateCartQty(productId, qty - 1, token);
      dispatch(setCart(data.cart.items));
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  // ✅ Remove Item
  const removeItem = async (productId) => {
    try {
      const { data } = await removeCartItem(productId, token);
      dispatch(setCart(data.cart.items));
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  // ✅ Clear Cart
  const handleClearCart = async () => {
    try {
      await clearCartAPI(token);
      dispatch(clearCart());
      toast.success("Cart cleared");
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  };

  // Total price
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="container-cart">
      <div className="d-flex justify-content-between align-items-center">
        <h2 style={{ fontSize: "2.5rem", fontWeight: "600" }}>My Cart</h2>

        <button
          className="clearCart"
          onClick={handleClearCart}
          disabled={items.length === 0}
        >
          Remove All
        </button>
      </div>

      {/* EMPTY CART */}
      {items.length === 0 ? (
        <div className="text-center mt-5">
          <span style={{ fontSize: "2rem", color: "red" }}>Cart is Empty</span>
        </div>
      ) : (
        items.map((item) => (
          <div
            key={item.product._id}
            className="cart-item mb-3 p-3 d-flex justify-content-between align-items-center border shadow"
          >
            {/* PRODUCT INFO */}
            <div className="d-flex align-items-center">
              <img
                src={item.product.img}
                alt={item.product.title}
                style={{ width: "80px", borderRadius: "8px" }}
              />

              <div className="ms-3">
                <h5>{item.product.title}</h5>
                <p>₹{item.product.price}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div>
              <div className="qty">
                <button
                  disabled={item.quantity === 1}
                  onClick={() => decreaseQty(item.product._id, item.quantity)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.product._id, item.quantity)}
                >
                  +
                </button>
              </div>

              <button
                className="bg-danger text-white border-0 rounded mt-2 removed"
                onClick={() => removeItem(item.product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {/* TOTAL */}
      {items.length > 0 && (
        <div className="mt-4 text-end">
          <h3>Total: ₹{total}</h3>

          <button className="checkoutBtn" onClick={() => navigate("/checkout")}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
