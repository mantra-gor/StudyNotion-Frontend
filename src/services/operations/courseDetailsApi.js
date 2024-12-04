import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apiEndpoints";

const {
  ADD_COURSE,
  ADD_SECTION,
  UPDATE_SECTION,
  DELETE_SECTION,
  CREATE_SUBSECTION,
  UPDATE_SUBSECTION,
} = courseEndpoints;

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
    console.error("Failed to create course: ", error);
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
    console.error("Failed to update course: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function createSection(data) {
  try {
    const res = await apiConnector("POST", ADD_SECTION, data);
    if (res.success) {
      toast.success(res.message);
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to create course section: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function updateSection(data) {
  try {
    const res = await apiConnector("PUT", UPDATE_SECTION, data);
    if (res.success) {
      toast.success(res.message);
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to create course section: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function deleteSection(data) {
  try {
    const res = await apiConnector("DELETE", DELETE_SECTION, data);
    if (res.success) {
      toast.success(res.message);
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to delete course section: ", error);
    return toast.error(error.response.data.message);
  }
}

//* Sub Section APIs
export async function createSubSection(data) {
  try {
    const res = await apiConnector("POST", CREATE_SUBSECTION, data);
    if (res.success) {
      toast.success(res.message);
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to create course sub section: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function updateSubSection(data) {
  try {
    const res = await apiConnector("POST", UPDATE_SUBSECTION, data);
    if (res.success) {
      toast.success(res.message);
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to create course sub section: ", error);
    return toast.error(error.response.data.message);
  }
}
