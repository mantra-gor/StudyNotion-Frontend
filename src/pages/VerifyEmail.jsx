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
        <div className="w-10/12 md:w-3/12">
          <h1 className="text-2xl font-bold">Verify Email</h1>
          <p className=" text-richblack-100 mt-4">
            A verification code has been sent to you. Enter the code here.
          </p>
          <form onSubmit={handleSubmit}>
            <OtpInput
              value={otp}
              numInputs={6}
              onChange={setOtp}
              shouldAutoFocus={true}
              renderSeparator={<span> - </span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "13px",
                  }}
                  placeholder="x"
                  className=" text-richblack-5 bg-richblack-600 rounded-md mx-2 my-4 text-2xl"
                />
              )}
            />
            <Button active={true}>Verify Email</Button>
          </form>
          <div className="flex items-center justify-between">
            <Link to="/signup">
              <div className="mt-4 flex place-items-center gap-2">
                <FaArrowLeftLong />
                <span className="text-sm">Back to Signup</span>
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
