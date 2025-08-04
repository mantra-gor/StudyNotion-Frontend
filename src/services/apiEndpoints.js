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
  EDIT_COURSE: "/course/edit-course",
  DELETE_COURSE: "/course/delete-course",
  GET_COURSE_DETAILS: "/course/get-course-details",
  ADD_SECTION: "/course/create-section",
  UPDATE_SECTION: "/course/update-section",
  DELETE_SECTION: "/course/delete-section",
  CREATE_SUBSECTION: "/course/create-subsection",
  UPDATE_SUBSECTION: "/course/update-subsection",
  DELETE_SUBSECTION: "/course/delete-subsection",
  GET_ENROLLED_COURSES: "/course/get-enrolled-courses",
  GET_COURSE_BY_INSTRUCTOR: "/course/get-courses-by-instructor",
};

//* PROFILE ENDPOINTS
export const profileEndpoints = {
  UPDATE_PROFILE: "/profile/update-profile",
  UPDATE_PROFILE_PICTURE: "/profile/update-profile-picture",
};

//* CATALOG PAGE ENDPOINTS
export const catalogData = {
  CATALOG_PAGE_API: "/course/get-all-category",
  CATALOG_DATA_API: "/course/category-page-details",
};

//* AWS SERVICES ENDPOINTS
export const awsServicesEndpoints = {
  GET_S3_UPLOAD_URL: "/aws-services/generate-s3-upload-url",
};

//* CONTACT US
export const contactUsEndpoint = {
  CONTACT_US_API: "/contact-us",
};

//* PAYMENT ENDPOINTS
export const paymentEndpoints = {
  CAPTURE_PAYMENT: "/payment/capture-payment",
  VERIFY_PAYMENT: "/payment/verify-payment",
  SEND_SUCCESS_MAIL: "/payment/send-success-mail",
};
