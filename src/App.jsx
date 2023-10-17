import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  StudentDetail,
  NotFoundPage,
  StudentList,
  Profile,
  Intro,
  Signin,
  Add,
  News,
  Signup,
} from "./page";
import RootLayoutPublic from "./components/layout/public/rootLayoutPublic";
import Test from "./page/Test";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./route/PrivateRoute";

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
            <Route path="/detail/:id" element={<StudentDetail />} />
            <Route path="/studentlist" element={<StudentList />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/add" element={<Add />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
