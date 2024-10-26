import toast from "react-hot-toast";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints, catalogData } from "../apiEndpoints";
import { setUser } from "../../redux/slices/profileSlice";

const {
  SENDOTP,
  SIGNUP,
  LOGIN,
  FORGOTPASSWORD_API,
  RESETPASSWORD_API,
  CHANGE_PASSWORD,
} = authEndpoints;
const { CATALOG_PAGE_API } = catalogData;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    await apiConnector("POST", SENDOTP, {
      email,
    })
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          navigate("/verify-email");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        console.log("Failed to send OTP: ", error);
      });
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
    await apiConnector("POST", SIGNUP, {
      accountType,
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      phoneNo,
      otp,
    })
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          navigate("/login");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        console.log("Reset Password Failed: ", error);
      });
    dispatch(setLoading(false));
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector("POST", LOGIN, {
        email,
        password,
      });

      if (res.success) {
        toast.success(res.message);
        dispatch(setToken(res.data.token));
        dispatch(setUser(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard/my-profile");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Authentication Failed: ", error);
      toast.error("Authentication failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getPasswordResetToken(email, setIsEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    await apiConnector("POST", FORGOTPASSWORD_API, {
      email,
    })
      .then((res) => {
        if (res.success) {
          toast.success("Mail sent for reset password.");
          setIsEmailSent(true);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        console.log("Reset Password Token Failed: ", error);
      });
    dispatch(setLoading(false));
  };
}

export function resetPassword(newPassword, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    await apiConnector("POST", RESETPASSWORD_API, {
      token,
      password: newPassword,
      confirmPassword,
    })
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          navigate("/login");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        console.log("Reset Password Failed: ", error);
      });
    dispatch(setLoading(false));
  };
}

export function getAllCategory(setSubLinks) {
  return async () => {
    await apiConnector("GET", CATALOG_PAGE_API)
      .then((res) => {
        if (res.success) {
          setSubLinks(res.data);
          return res.data;
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) =>
        console.log("Couldn't fetch the category list: ", error)
      );
  };
}

export function updatePassword(payload) {
  return async () => {
    await apiConnector("PUT", CHANGE_PASSWORD, payload)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        console.log("Couldn't Change Password: ", error);
      });
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };
}
