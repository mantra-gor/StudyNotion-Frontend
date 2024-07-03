import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/spinner/Spinner";
import Input from "../components/ui/Input";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Button from "../components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { resetPassword } from "../services/operations/authApi";

function ResetPassword() {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(
      resetPassword(
        formData.newPassword,
        formData.confirmPassword,
        token,
        navigate
      )
    );
  };

  return (
    <div className="w-full h-[90vh] text-richblack-5 flex flex-col justify-center items-center">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-10/12 md:w-3/12">
          <h1 className="text-2xl font-bold">Choose new password</h1>
          <p className=" text-richblack-100 my-4">
            Almost done. Enter your new password and youre all set.
          </p>
          <form onSubmit={onSubmit}>
            <div className=" relative">
              <label htmlFor="newPassword">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  New Password{" "}
                  <sup className=" text-[0.725rem] text-pink-200">*</sup>
                </p>
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                required
                name="newPassword"
                id="newPassword"
                placeholder="Enter Password"
                className="w-full"
                onChange={handleChange}
                value={formData.password}
              />
              <span
                className=" absolute cursor-pointer text-richblack-5 right-3 top-[38px] text-2xl"
                onClick={() => setShowPassword((prevValue) => !prevValue)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fill="#afb2bf" />
                ) : (
                  <AiOutlineEye fill="#afb2bf" />
                )}
              </span>
            </div>

            <div className="mt-5 relative">
              <label htmlFor="confirmPassword">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Confirm Password{" "}
                  <sup className="text-[0.725rem] text-pink-200">*</sup>
                </p>
              </label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                required
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="w-full"
                onChange={handleChange}
                value={formData.password}
              />
              <span
                className=" absolute cursor-pointer text-richblack-5 right-3 top-[38px] text-2xl"
                onClick={() =>
                  setShowConfirmPassword((prevValue) => !prevValue)
                }
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fill="#afb2bf" />
                ) : (
                  <AiOutlineEye fill="#afb2bf" />
                )}
              </span>
            </div>
            <div className="mt-7">
              <Button active={true}>Reset Password</Button>
            </div>
          </form>
          <Link to="/login">
            <div className="mt-4 flex place-items-center gap-2">
              <FaArrowLeftLong />
              <span className="text-sm">Back to login</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
