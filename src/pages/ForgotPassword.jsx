import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Input from "../components/ui/Input";
import { getPasswordResetToken } from "../services/operations/authApi";
import Button from "../components/ui/Button";
import { FaArrowLeftLong } from "react-icons/fa6";
import Spinner from "../components/ui/spinner/Spinner";

function ForgotPassword() {
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const initialEmailId = location.state?.emailId || "";
  const [emailId, setEmailId] = useState(initialEmailId);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(emailId, setIsEmailSent));
  };

  return (
    <div className="w-full h-[90vh] text-richblack-5 flex flex-col justify-center items-center">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-10/12 md:w-3/12 ">
          <h1 className="text-2xl font-bold">
            {!isEmailSent ? "Reset Your Password" : "Check your mail"}
          </h1>
          <p className=" text-richblack-100 my-4">
            {!isEmailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${emailId}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!isEmailSent && (
              <label>
                <p className="text-sm text-richblack-25 mb-2">Email Address</p>
                <Input
                  type="email"
                  name="email"
                  required
                  value={emailId}
                  disabled={initialEmailId !== ""}
                  placeholder="Enter your email address"
                  className="w-full mb-6"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            )}
            <div>
              {!isEmailSent ? (
                <Button type="submit" active={true}>
                  Reset Password
                </Button>
              ) : (
                <Button type="submit" active={true}>
                  Resend Email
                </Button>
              )}
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

export default ForgotPassword;
