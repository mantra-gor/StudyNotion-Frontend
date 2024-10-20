//** AUTH ENDPOINTS
export const authEndpoints = {
  SIGNUP: "/auth/signup",
  SENDOTP: "/auth/sendotp",
  LOGIN: "/auth/login",
  RESETPASSWORD_API: "/auth/reset-password",
  FORGOTPASSWORD_API: "/auth/forgot-password",
  CHANGE_PASSWORD: "/auth/change-password",
};

//** PROFILE ENDPOINTS
export const profileEndpoints = {
  UPDATE_PROFILE: "/profile/update-profile",
  GET_ALL_COURSES: "/profile/get-enrolled-courses",
};

//** CATALOG PAGE ENDPOINTS
export const catalogData = {
  CATALOG_PAGE_API: "/course/get-all-category",
};

//** CONTACT US
export const contactUsEndpoint = {
  CONTACT_US_API: "/contact-us",
};
