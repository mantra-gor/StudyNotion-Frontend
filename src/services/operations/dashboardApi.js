import toast from "react-hot-toast";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apiEndpoints";

const { UPDATE_PROFILE, UPDATE_PROFILE_PICTURE } = profileEndpoints;

export async function updateProfile(userDetails) {
  try {
    const res = await apiConnector("PUT", UPDATE_PROFILE, userDetails);
    if (res.success) {
      toast.success(res.message);
    } else {
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    console.log("Update failed:", error);
    toast.error(error.message);
    return { success: false, message: error.message };
  }
}

export async function updateProfilePicture(objectUrl) {
  try {
    const res = await apiConnector("POST", UPDATE_PROFILE_PICTURE, objectUrl);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    console.log("Update failed:", error);
    toast.error(error.message);
    return { success: false, message: error.message };
  }
}
