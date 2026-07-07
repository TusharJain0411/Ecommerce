import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import userReducer from "./slices/userSlice";
import adminReducer from "./slices/adminSlice";
import orderReducer from "./slices/orderSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    admin:adminReducer,
    order:orderReducer
  },
});

export default store;