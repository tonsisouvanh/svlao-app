import "./App.css";
import { Route, Routes } from "react-router-dom";

import RootLayoutPublic from "./components/layout/public/rootLayoutPublic";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./route/PrivateRoute";
import Signin from "./page/auth/Signin";
import Signup from "./page/auth/Signup";
import UserProfile from "./page/student/UserProfile";
import NotFoundPage from "./page/NoFoundPage";
import StudentList from "./page/student/StudentList";
import EditStudent from "./page/student/EditStudent";
import Dashboard from "./page/Dashboard";
import AddStudent from "./page/student/AddStudent";
import UniversityList from "./page/university/UniversityList";
import AddUniversity from "./page/university/AddUniversity";
import EditUniversity from "./page/university/EditUniversity";
import MajorList from "./page/major/MajorList";
import AddMajor from "./page/major/AddMajor";
import EditMajor from "./page/major/EditMajor";
import ResidenceAddressList from "./page/residenceAddress/ResidenceAddressList";
import EditResidenceAddress from "./page/residenceAddress/EditResidenceAddress";
import AddResidenceAddress from "./page/residenceAddress/AddResidenceAddress";
import DocumentForm from "./page/DocumentForm";
import Announcement from "./page/announcement/Announcement";
import AnnouncementList from "./page/announcement/private/AnnouncementList";
import AddAnnouncement from "./page/announcement/private/AddAnnouncement";
import EditAnnouncement from "./page/announcement/private/EditAnnouncement";
import AnnouncementDetail from "./page/announcement/AnnouncementDetail";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<RootLayoutPublic />}>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* ======================= Announcement ======================================== */}
            {/* private */}
            <Route
              path="/manage-others-data/announcement-list"
              element={<AnnouncementList />}
            />
            <Route
              path="/manage-others-data/announcement-list/page/:pageNumber"
              element={<AnnouncementList />}
            />
            <Route
              path="/manage-others-data/announcement-list/search/:keyword"
              element={<AnnouncementList />}
            />
            <Route
              path="/manage-others-data/announcement-list/search/:keyword/page/:pageNumber"
              element={<AnnouncementList />}
            />
            <Route
              path="/manage-others-data/announcement-list/add"
              element={<AddAnnouncement />}
            />
            <Route
              path="/manage-others-data/announcement-list/:id"
              element={<EditAnnouncement />}
            />

            {/* public */}
            <Route path="/" element={<Announcement />} />
            <Route path="/page/:pageNumber" element={<Announcement />} />
            <Route path="/search/:keyword" element={<Announcement />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<Announcement />}
            />
            <Route
              path="/announcement-list/page/:pageNumber"
              element={<Announcement />}
            />
            <Route
              path="/announcement-list/search/:keyword"
              element={<Announcement />}
            />
            <Route
              path="/announcement-list/search/:keyword/page/:pageNumber"
              element={<Announcement />}
            />
            <Route
              path="/announcement-list/announcement/:id"
              element={<AnnouncementDetail />}
            />

            {/* ================================================================== */}

            {/* ======================= Student ======================================== */}
            <Route
              path="/dashboard/studentlist/page/:pageNumber"
              element={<StudentList />}
            />
            <Route
              path="/dashboard/studentlist/search/:keyword"
              element={<StudentList />}
            />
            <Route
              path="/dashboard/studentlist/search/:keyword/page/:pageNumber"
              element={<StudentList />}
            />
            <Route path="dashboard/studentlist" element={<StudentList />} />
            <Route
              path="dashboard/studentlist/student/:id"
              element={<EditStudent />}
            />
            <Route path="dashboard/studentlist/add" element={<AddStudent />} />
            {/* ================================================================== */}
            {/* ======================= University ======================================== */}
            <Route
              path="manage-others-data/university-list/add"
              element={<AddUniversity />}
            />
            <Route
              path="manage-others-data/university-list/:id"
              element={<EditUniversity />}
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route
              path="/manage-others-data/university-list"
              element={<UniversityList />}
            />
            {/* ================================================================== */}
            {/* Major */}
            <Route
              path="/manage-others-data/major-list"
              element={<MajorList />}
            />
            <Route
              path="/manage-others-data/major-list/add"
              element={<AddMajor />}
            />
            <Route
              path="/manage-others-data/major-list/:id"
              element={<EditMajor />}
            />
            {/* Residence Address */}
            <Route
              path="/manage-others-data/residence-address-list"
              element={<ResidenceAddressList />}
            />
            <Route
              path="/manage-others-data/residence-address-list/add"
              element={<AddResidenceAddress />}
            />
            <Route
              path="/manage-others-data/residence-address-list/:id"
              element={<EditResidenceAddress />}
            />

            <Route path="/document-form-list" element={<DocumentForm />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
