import toast from "react-hot-toast";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../redux/slices/profileSlice";
import { profileEndpoints } from "../apiEndpoints";
import { data } from "autoprefixer";

const { UPDATE_PROFILE, GET_ALL_COURSES } = profileEndpoints;

export function updateProfile(userDetails) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    await apiConnector("PUT", UPDATE_PROFILE, userDetails)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(setLoading(false));
  };
}

export async function getUserEnrolledCourses(setEnrolledCourses) {
  await apiConnector("GET", GET_ALL_COURSES)
    .then((res) => {
      setEnrolledCourses(res.data);
      console.log(res);
    })
    .catch((error) => console.log(error));
}
