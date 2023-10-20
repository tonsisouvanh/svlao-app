import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/AuthSlice";
import studentsReducer, {
  fetchSingleStudent,
} from "../feature/student/StudentSlice";
import { fetchStudents } from "../feature/student/StudentSlice";
console.log("store");
export const store = configureStore({
  reducer: {
    user: authReducer,
    students: studentsReducer,
  },
});


export default store;
