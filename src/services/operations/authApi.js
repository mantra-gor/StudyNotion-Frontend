import toast from "react-hot-toast";
import { setLoading } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apiEndpoints";

const { SENDOTP, SIGNUP, FORGOTPASSWORD_API, RESETPASSWORD_API } =
  authEndpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = apiConnector("POST", SENDOTP, {
        email,
      });
      if (response.success) {
        toast.success(response.message);
        navigate("/verify-email");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log("Reset Password Token Failed: ", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  password,
  confirmPassword,
  email,
  phoneNo,
  navigate,
  otp
) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", SIGNUP, {
        accountType,
        firstName,
        lastName,
        password,
        confirmPassword,
        email,
        phoneNo,
        otp,
      });
      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log("Reset Password Failed: ", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function getPasswordResetToken(email, setIsEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", FORGOTPASSWORD_API, {
        email,
      });
      if (response.success) {
        toast.success("Mail sent for reset password.");
        setIsEmailSent(true);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log("Reset Password Token Failed: ", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(newPassword, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        token,
        password: newPassword,
        confirmPassword,
      });
      if (response.success) {
        toast.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log("Reset Password Failed: ", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
