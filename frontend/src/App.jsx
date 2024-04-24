import "./App.css";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/layout/public/RootLayout";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./route/PrivateRoute";

import { AddAnnouncement, AddDocument, AddMajor, AddResidenceAddress, AddStudent, AddUniversity, AnnouncementDetail, AnnouncementList, AnnouncementPage, Dashboard, DocumentList, DocumentPage, EditAnnouncement, EditDocument, EditMajor, EditResidenceAddress, EditStudent, EditUniversity, MajorList, NotFoundPage, ResidenceAddressList, Signin, Signup, StudentList, UniversityList, UserProfile } from "./page";
import Spinner from "./components/ui/Spinner";
import { useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import ComingSoon from "./page/ComingSoon";
import { Suspense } from "react";

function App() {
  const { status } = useSelector((state) => state.auth);
  if (status.signout === "loading") return <Spinner />;
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />

          <Route path="/" element={<RootLayout />}>
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
              <Route path="/" element={<AnnouncementPage />} />
              <Route path="/page/:pageNumber" element={<AnnouncementPage />} />
              <Route path="/search/:keyword" element={<AnnouncementPage />} />
              <Route
                path="/search/:keyword/page/:pageNumber"
                element={<AnnouncementPage />}
              />
              <Route
                path="/announcement-list/page/:pageNumber"
                element={<AnnouncementPage />}
              />
              <Route
                path="/announcement-list/search/:keyword"
                element={<AnnouncementPage />}
              />
              <Route
                path="/announcement-list/search/:keyword/page/:pageNumber"
                element={<AnnouncementPage />}
              />
              <Route
                path="/announcement-list/announcement/:id"
                element={<AnnouncementDetail />}
              />

              {/* ================================================================== */}

              {/* ======================= Student ======================================== */}
              <Route
                path="/dashboard/student-list/page/:pageNumber"
                element={<StudentList />}
              />
              <Route
                path="/dashboard/student-list/search/:keyword"
                element={<StudentList />}
              />
              <Route
                path="/dashboard/student-list/search/:keyword/page/:pageNumber"
                element={<StudentList />}
              />
              <Route path="/dashboard/student-list" element={<StudentList />} />
              <Route
                path="/dashboard/student-list/student/:id"
                element={<EditStudent />}
              />
              <Route
                path="/dashboard/student-list/add"
                element={<AddStudent />}
              />
              {/* ================================================================== */}
              {/* ======================= University ======================================== */}
              <Route
                path="/manage-others-data/university-list/add"
                element={<AddUniversity />}
              />
              <Route
                path="/manage-others-data/university-list/:id"
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

              {/* Document */}
              {/* private */}
              <Route
                path="/manage-others-data/document-form-list"
                element={<DocumentList />}
              />
              <Route
                path="/manage-others-data/document-form-list/page/:pageNumber"
                element={<DocumentList />}
              />
              <Route
                path="/manage-others-data/document-form-list/search/:keyword"
                element={<DocumentList />}
              />
              <Route
                path="/manage-others-data/document-form-list/search/:keyword/page/:pageNumber"
                element={<DocumentList />}
              />
              <Route
                path="/manage-others-data/document-form-list/add"
                element={<AddDocument />}
              />
              <Route
                path="/manage-others-data/document-form-list/:id"
                element={<EditDocument />}
              />
              {/* Public */}
              <Route path="/document-form-list" element={<DocumentPage />} />
              <Route
                path="/document-form-list/page/:pageNumber"
                element={<DocumentPage />}
              />
              <Route
                path="/document-form-list/search/:keyword"
                element={<DocumentPage />}
              />
              <Route
                path="/document-form-list/search/:keyword/page/:pageNumber"
                element={<DocumentPage />}
              />
              <Route
                path="/document-form-list/search/:keyword/page/:pageNumber"
                element={<DocumentPage />}
              />
              {/* ================================================================== */}
              <Route path="/formal-organization" element={<ComingSoon />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
