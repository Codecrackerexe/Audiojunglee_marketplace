import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Slices/authSlice";
import productReducer from './Slices/productSlice';
import categoryReducer from "./Slices/categorySlice";
import cartReducer from "./Slices/cartSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
  },
});

