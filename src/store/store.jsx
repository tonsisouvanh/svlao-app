import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/AuthSlice";
import studentsReducer, {
  fetchSingleStudent,
} from "../feature/student/StudentSlice";
import { fetchStudents } from "../feature/student/StudentSlice";
export const store = configureStore({
  reducer: {
    user: authReducer,
    students: studentsReducer,
  },
});
// store.dispatch(fetchStudents());
// store.dispatch(fetchSingleStudent());
export default store;
