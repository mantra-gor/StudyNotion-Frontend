import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Cart() {
  const { total, totalItems, cart } = useSelector((state) => state.cart);

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Clean Header */}
      <div className="border-b border-richblack-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/catalog"
              className="flex items-center space-x-2 text-richblack-300 hover:text-richblack-100 transition-colors duration-200"
            >
              <FaArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>

            <div className="flex items-center space-x-4">
              <FaShoppingCart className="text-yellow-50" size={24} />
              <div>
                <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
                <p className="text-richblack-300 text-sm mt-1">
                  {totalItems > 0
                    ? `${totalItems} course${
                        totalItems > 1 ? "s" : ""
                      } in your cart`
                    : "Your cart is empty"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {total > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <RenderCartCourses />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <RenderTotalAmount />
            </div>
          </div>
        ) : (
          /* Clean Empty State */
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-richblack-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-richblack-700">
              <FaShoppingCart className="w-12 h-12 text-richblack-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Your cart is empty
            </h2>
            <p className="text-richblack-300 mb-8 max-w-md mx-auto">
              Start learning today by adding courses to your cart
            </p>
            <Link
              to="/catalog"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-richblack-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
