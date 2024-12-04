//* AUTH ENDPOINTS
export const authEndpoints = {
  AUTH_USER: "/auth/user",
  SIGNUP: "/auth/signup",
  SENDOTP: "/auth/sendotp",
  LOGIN: "/auth/login",
  REFRESH_TOKEN: "/auth/refresh-token",
  RESETPASSWORD_API: "/auth/reset-password",
  FORGOTPASSWORD_API: "/auth/forgot-password",
  CHANGE_PASSWORD: "/auth/change-password",
};

//* COURSE ENDPOINTS
export const courseEndpoints = {
  ADD_COURSE: "/course/create-course",
  ADD_SECTION: "/course/create-section",
  UPDATE_SECTION: "/course/update-section",
  DELETE_SECTION: "/course/delete-section",
  CREATE_SUBSECTION: "/course/create-subsection",
  UPDATE_SUBSECTION: "/course/update-subsection",
};

//* PROFILE ENDPOINTS
export const profileEndpoints = {
  UPDATE_PROFILE: "/profile/update-profile",
  GET_ALL_COURSES: "/profile/get-enrolled-courses",
};

//* CATALOG PAGE ENDPOINTS
export const catalogData = {
  CATALOG_PAGE_API: "/course/get-all-category",
};

//* CONTACT US
export const contactUsEndpoint = {
  CONTACT_US_API: "/contact-us",
};
