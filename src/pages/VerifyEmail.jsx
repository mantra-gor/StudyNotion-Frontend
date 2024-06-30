import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/spinner/Spinner";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import { FaArrowLeftLong, FaClockRotateLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authApi";

function VerifyEmail() {
  const { loading, signupData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      phoneNo,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        password,
        confirmPassword,
        email,
        phoneNo,
        navigate,
        otp
      )
    );
  };
  return (
    <div className="w-full h-[90vh] text-richblack-5 flex flex-col justify-center items-center">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>A verification code has been sent to you. Enter the code here.</p>
          <form onSubmit={handleSubmit}>
            <OtpInput
              value={otp}
              numInputs={6}
              onChange={setOtp}
              renderInput={(props) => <input {...props} />}
            />
            <Button active={true}>Verify Email</Button>
          </form>
          <div className="flex items-center justify-between">
            <Link to="/login">
              <div className="mt-4 flex place-items-center gap-2">
                <FaArrowLeftLong />
                <span className="text-sm">Back to login</span>
              </div>
            </Link>
            <Link>
              <div className="mt-4 flex place-items-center gap-2 text-richblack-100">
                <FaClockRotateLeft />
                <span
                  className="text-sm"
                  onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                >
                  Resend it
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
