import "./App.css";
import { Route, Routes } from "react-router-dom";

import RootLayoutPublic from "./components/layout/public/rootLayoutPublic";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./route/PrivateRoute";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import News from "./page/News";
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

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<RootLayoutPublic />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<News />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
            {/* <Route path="/intro" element={<Intro />} /> */}
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
