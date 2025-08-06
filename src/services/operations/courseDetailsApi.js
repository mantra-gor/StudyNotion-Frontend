import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apiEndpoints";
// import toast from "react-hot-toast";

const {
  ADD_COURSE,
  EDIT_COURSE,
  DELETE_COURSE,
  GET_COURSE_DETAILS,
  ADD_SECTION,
  UPDATE_SECTION,
  DELETE_SECTION,
  CREATE_SUBSECTION,
  UPDATE_SUBSECTION,
  DELETE_SUBSECTION,
  GENERATE_LECTURE_URL,
  GET_ENROLLED_COURSES,
  GET_COURSE_BY_INSTRUCTOR,
  GET_AUTHORIZED_COURSE_CONTENT,
} = courseEndpoints;

//* Course APIs
export async function addCourse(data, fileData) {
  try {
    const res = await apiConnector("POST", ADD_COURSE, data);
    if (res.success) {
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to create course: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function updateCourse(data) {
  try {
    const res = await apiConnector("PUT", EDIT_COURSE, data);
    if (res.success) {
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to update course: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function fetchInstructorCourses() {
  try {
    const res = await apiConnector("GET", GET_COURSE_BY_INSTRUCTOR);
    if (res.success) {
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to update course: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function fetchEnrolledCourses() {
  try {
    const res = await apiConnector("GET", GET_ENROLLED_COURSES);
    if (res.success) {
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to fetch enrolled courses: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function deleteCourse(courseID) {
  try {
    const res = await apiConnector("DELETE", `${DELETE_COURSE}/${courseID}`);
    if (res.success) {
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to delete course: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function getFullDetailsOfCourse(courseID) {
  try {
    const res = await apiConnector("GET", `${GET_COURSE_DETAILS}/${courseID}`);
    if (res.success) {
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to get course details: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function fetchCourseWithContent(courseID) {
  try {
    const res = await apiConnector(
      "GET",
      `${GET_AUTHORIZED_COURSE_CONTENT}/${courseID}`
    );
    if (res.success) {
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to get course details: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function fetchLecturePresignedURL(videoKey, courseID) {
  try {
    const res = await apiConnector("POST", GENERATE_LECTURE_URL, {
      videoKey,
      courseID,
    });
    if (res.success) {
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to get course details: ", error);
    return toast.error(error.response.data.message);
  }
}

//* Section APIs
export async function createSection(data) {
  try {
    const res = await apiConnector("POST", ADD_SECTION, data);
    if (res.success) {
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
    const res = await apiConnector("PUT", UPDATE_SUBSECTION, data);
    if (res.success) {
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to create course sub section: ", error);
    return toast.error(error.response.data.message);
  }
}

export async function deleteSubSection(data) {
  try {
    const res = await apiConnector("DELETE", DELETE_SUBSECTION, data);
    if (res.success) {
      // toast.success(res.message);
      return res;
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to create course sub section: ", error);
    toast.error(error.response.data.message);
    return error.response.data;
  }
}
