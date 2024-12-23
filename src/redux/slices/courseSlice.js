import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setSteps: (state, action) => {
      state.step = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.editCourse = action.payload;
    },
    resetCourseState: (state) => {
      state.editCourse = {
        step: 1,
        course: null,
        editCourse: false,
        paymentLoading: false,
      };
    },
  },
});

export const {
  setSteps,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions;

export default courseSlice.reducer;
