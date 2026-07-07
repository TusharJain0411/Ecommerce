import { createSlice } from "@reduxjs/toolkit";

const getOrdersFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("orders")) || [];
};

const saveOrdersToLocalStorage = (orders) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

const initialState = {
  items: getOrdersFromLocalStorage(),
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    setOrders: (state, action) => {
      state.items = action.payload;
      saveOrdersToLocalStorage(action.payload);
    },

    addOrder: (state, action) => {
      state.items.unshift(action.payload);
      saveOrdersToLocalStorage(state.items);
    },

    clearOrders: (state) => {
      state.items = [];
      localStorage.removeItem("orders");
    },
  },
});

export const { setOrders, addOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
