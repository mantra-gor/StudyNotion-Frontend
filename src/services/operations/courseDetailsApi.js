import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apiEndpoints";

const { ADD_COURSE } = courseEndpoints;

export async function addCourse(formData) {
  try {
    const res = await apiConnector("POST", ADD_COURSE, formData);
    if (res.success) {
      toast.success(res.message);
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Authentication Failed: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function updateCourse(formData) {
  try {
    const res = await apiConnector("POST", ADD_COURSE, formData);
    if (res.success) {
      toast.success(res.message);
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Authentication Failed: ", error);
    return toast.error(error.response.data.message);
  }
}
