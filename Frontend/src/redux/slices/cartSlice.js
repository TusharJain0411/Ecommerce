import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cartItems")) || [];
};

const saveCartToLocalStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const initialState = {
  items: getCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
      saveCartToLocalStorage(action.payload);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
