import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalCartItems: localStorage.getItem("totalCartItems")
    ? JSON.parse(localStorage.getItem("totalCartItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    // add to cart
    addToCart(state, action) {
      state.cart = action.payload;
    },

    // remove from cart
    removeFromCart(state, action) {
      state.cart = state.cart.filter((course) => course.id !== action.payload);
    },

    // reset cart
    resetCart(state) {
      state.cart = [];
    },
  },
});

export const { setTotalCartItems, removeFromCart, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
