import toast from "react-hot-toast";
import { setLoading } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apiEndpoints";

const { FORGOTPASSWORD_API } = authEndpoints;

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

// export function resetNewPassword(token, password, confirmPassword) {
//   return async (dispatch) => {
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", )
//     } catch (error) {

//     }
//   }
// }
