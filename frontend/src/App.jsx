import "./App.css";
import { Route, Routes } from "react-router-dom";

import RootLayoutPublic from "./components/layout/public/rootLayoutPublic";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./route/PrivateRoute";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
// import StudentDetail from "./page/StudentDetail";
// import StudentList from "./page/StudentList";
import UserProfile from "./page/UserProfile";
// import Intro from "./page/Intro";
// import AddStudent from "./page/student/AddStudent";
import NotFoundPage from "./page/NoFoundPage";
import StudentList from "./page/StudentList";
import EditStudent from "./page/EditStudent";
import Dashboard from "./page/Dashboard";
import AddStudent from "./page/AddStudent";
import UniversityList from "./page/university/UniversityList";
import AddUniversity from "./page/university/AddUniversity";
import EditUniversity from "./page/university/EditUniversity";
import MajorList from "./page/major/MajorList";
import AddMajor from "./page/major/AddMajor";
import EditMajor from "./page/major/EditMajor";
import ResidenceAddressList from "./page/residenceAddress/ResidenceAddressList";
import EditResidenceAddress from "./page/residenceAddress/EditResidenceAddress";
import AddResidenceAddress from "./page/residenceAddress/AddResidenceAddress";
import AnnouncementList from "./page/AnnouncementList";
import DocumentForm from "./page/DocumentForm";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<RootLayoutPublic />}>
          <Route element={<PrivateRoute />}>
            {/* Announcements */}
            <Route path="/" element={<AnnouncementList />} />
            <Route path="/page/:pageNumber" element={<AnnouncementList />} />
            <Route path="/search/:keyword" element={<AnnouncementList />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<AnnouncementList />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* student list */}
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
            <Route
              path="dashboard/university-list/add"
              element={<AddUniversity />}
            />
            <Route
              path="dashboard/university-list/:id"
              element={<EditUniversity />}
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route
              path="/dashboard/university-list"
              element={<UniversityList />}
            />
            {/* Major */}
            <Route path="/dashboard/major-list" element={<MajorList />} />
            <Route path="dashboard/major-list/add" element={<AddMajor />} />
            <Route path="dashboard/major-list/:id" element={<EditMajor />} />
            {/* Residence Address */}
            <Route
              path="/dashboard/residence-address-list"
              element={<ResidenceAddressList />}
            />
            <Route
              path="dashboard/residence-address-list/add"
              element={<AddResidenceAddress />}
            />
            <Route
              path="dashboard/residence-address-list/:id"
              element={<EditResidenceAddress />}
            />

            {/* Announcements */}
            <Route
              path="/announcement-list/page/:pageNumber"
              element={<AnnouncementList />}
            />
            <Route
              path="/announcement-list/search/:keyword"
              element={<AnnouncementList />}
            />
            <Route
              path="/announcement-list/search/:keyword/page/:pageNumber"
              element={<AnnouncementList />}
            />
            <Route path="/announcement-list" element={<AnnouncementList />} />

            <Route path="/document-form-list" element={<DocumentForm />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
