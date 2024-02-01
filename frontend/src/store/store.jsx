import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/AuthSlice";
import userReducer from "../feature/user/UserSlice";
import studentsReducer from "../feature/student/StudentSlice";
import universitiesReducer from "../feature/globalData/UniversitySlice";
import majorsReducer from "../feature/globalData/MajorSlice";
import singleUserReducer from "../feature/user/SingleUserSlice";
import residenceAddressReducer from "../feature/globalData/ResidenceAddressSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    singleUser: singleUserReducer,
    students: studentsReducer,
    university: universitiesReducer,
    major: majorsReducer,
    residenceAddress: residenceAddressReducer,
  },
});

export default store;
