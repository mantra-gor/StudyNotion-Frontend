import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Input from "../components/ui/Input";

function ForgotPassword() {
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const initialEmailId = location.state?.emailId || "";
  const [emailId, setEmailId] = useState(initialEmailId);
  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <div className="w-full h-full text-richblack-5 flex flex-col justify-center items-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="md:w-3/12 h-full ">
          <h1 className="text-2xl font-bold">
            {!isEmailSent ? "Reset Your Password" : "Check your mail"}
          </h1>
          <p className=" text-richblack-100 my-4">
            {!isEmailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${emailId}`}
          </p>
          <form>
            {!isEmailSent && (
              <label>
                <p className="text-sm text-richblack-25">Email Address</p>
                <Input
                  type="email"
                  name="email"
                  required
                  value={emailId}
                  disabled={initialEmailId !== ""}
                  placeholder="Enter your email address"
                  className="w-full"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            )}
            <div>
              {!isEmailSent ? (
                <button>Reset Password</button>
              ) : (
                <button>Resend Email</button>
              )}
            </div>
          </form>
          <div>
            <Link to="/login">Back to login</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
