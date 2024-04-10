import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/AuthSlice";
import userReducer from "../feature/user/UserSlice";
import universitiesReducer, {
  listUniversity,
} from "../feature/globalData/UniversitySlice";
import majorsReducer, { listMajor } from "../feature/globalData/MajorSlice";
import singleUserReducer from "../feature/user/SingleUserSlice";
import residenceAddressReducer, {
  listResidenceAddress,
} from "../feature/globalData/ResidenceAddressSlice";
import announcementReducer from "../feature/announcement/AnnouncementSlice";
import documentReducer from "../feature/document/DocumentSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    singleUser: singleUserReducer,
    university: universitiesReducer,
    major: majorsReducer,
    residenceAddress: residenceAddressReducer,
    announcement: announcementReducer,
    document: documentReducer,
  },
});
store.dispatch(listResidenceAddress());
store.dispatch(listUniversity());
store.dispatch(listMajor());
export default store;
