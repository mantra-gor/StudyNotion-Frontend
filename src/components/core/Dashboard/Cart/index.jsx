import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

function Cart() {
  const { total, totalItems } = useSelector((state) => state.auth);

  return (
    <div className="text-white">
      <h1>Your Cart</h1>

      {total > 0 ? (
        <div>
          <p>{totalItems} Courses in cart</p>
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div>
          <p>Your cart is Empty</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
