import { useDispatch, useSelector } from "react-redux";
import { FaLock, FaShieldAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import Button from "../../../ui/Button";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { buyCourse } from "../../../../services/operations/purchaseApi";
import { useNavigate } from "react-router-dom";

function RenderTotalAmount() {
  const { total, cart, totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const { isLoggedin } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courseIds = cart.map((course) => course._id);
    // if user is not logged in redirect to login page
    if (!isLoggedin) {
      toast("Please login to enroll the course.");
      return navigate("/login");
    }
    buyCourse({
      courses: courseIds,
      userDetails: user,
      navigate,
      dispatch,
    });
  };

  return (
    <div className="sticky top-8 space-y-6">
      {/* Order Summary */}
      <div className="bg-richblack-800 rounded-lg border border-richblack-700">
        <div className="p-4 border-b border-richblack-700">
          <h3 className="text-xl font-semibold text-white">Order Summary</h3>
        </div>

        <div className="p-6 space-y-4">
          {/* Course Count & Price */}
          <div className="flex items-center justify-between">
            <span className="text-richblack-300">
              {totalItems} Course{totalItems > 1 ? "s" : ""}
            </span>
            <span className="text-white font-medium">
              ₹{total.toLocaleString()}
            </span>
          </div>

          <div className="border-t border-richblack-700 pt-4">
            <div className="flex items-center justify-between text-xl">
              <span className="font-semibold text-white">Total</span>
              <span className="font-bold text-white">
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Purchase Button */}
          <Button
            active
            onClick={handleBuyCourse}
            className="w-full text-base font-semibold flex items-center justify-center space-x-2"
          >
            <FaLock size={16} />
            <span>Complete Purchase</span>
          </Button>

          <p className="text-center text-richblack-400 text-sm">
            30-day money-back guarantee
          </p>
        </div>
      </div>

      {/* What you'll get */}
      <div className="bg-richblack-800 rounded-lg border border-richblack-700 p-6">
        <h4 className="text-white font-semibold mb-4">What you'll get:</h4>
        <ul className="space-y-3 text-richblack-200 text-sm">
          <li className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Lifetime access to all courses</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Certificate of completion</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>24/7 student support</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Mobile and desktop access</span>
          </li>
        </ul>
      </div>

      {/* Security */}
      <div className="bg-richblack-800 rounded-lg border border-richblack-700 p-4">
        <div className="flex items-center justify-center space-x-6 text-richblack-400 text-sm">
          <div className="flex items-center space-x-2">
            <FaShieldAlt size={14} />
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-2">
            <MdSecurity size={14} />
            <span>SSL Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderTotalAmount;
