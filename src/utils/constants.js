export const ACCOUNT_TYPE = {
  ADMIN: "Admin",
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
};

export const COURSES_STATUSES = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
};

export const FILE_CONFIG = {
  THUMBNAIL_MAX_FILE_SIZE: 6 * 1024 * 1024, // 6MB
  THUMBNAIL_SUPPORTED_MIME_TYPES: "image",
  COURSE_MAX_FILE_SIZE: 400 * 1024 * 1024, // 400MB
  COURSE_SUPPORTED_MIME_TYPES: "video",
};

export const uploadTips = [
  "Set the Course Price option or make it free.",
  "Standard size for the course thumbnail is 1024x576.",
  "Video section controls the course overview video.",
  "Course Builder is where you create & organize a course.",
  "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
  "Information from the Additional Data section shows up on the course single page.",
  "Make Announcements to notify any important.",
  "Notes to all enrolled students at once.",
];
