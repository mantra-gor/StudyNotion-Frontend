import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
  courseContentIndex: 0,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setSubSection: (state, action) => {
      const { courseContentIndex, subsection } = action.payload;
      state.course = {
        ...state.course,
        courseContent: state.course.courseContent.map((content, index) =>
          index === courseContentIndex ? subsection : content
        ),
      };
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },
    resetCourseState: () => initialState,
  },
});

export const {
  setStep,
  setCourse,
  setEditCourse,
  setSubSection,
  resetCourseState,
  setPaymentLoading,
} = courseSlice.actions;

export default courseSlice.reducer;
