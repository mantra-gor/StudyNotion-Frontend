import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  totalCartItems: localStorage.getItem("totalCartItems")
    ? JSON.parse(localStorage.getItem("totalCartItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    setTotalCartItems(state, action) {
      state.totalCartItems = action.payload;
    },
    // add to cart
    // remove from cart
    // reset cart
  },
});

export const { reducerName } = cartSlice.actions;
export default cartSlice.reducer;
