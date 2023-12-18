import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/AuthSlice";
import userReducer from "../feature/user/UserSlice";
import studentsReducer from "../feature/student/StudentSlice";
import universitiesReducer from "../feature/globalData/UniversitySlice";
import majorsReducer from "../feature/globalData/MajorSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    students: studentsReducer,
    university: universitiesReducer,
    majors: majorsReducer,
  },
});

export default store;
