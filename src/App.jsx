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
  Documents,
  Contact,
  Establishment,
} from "./page";
import RootLayoutPublic from "./components/layout/public/rootLayoutPublic";
import Test from "./page/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayoutPublic />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<StudentDetail />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/establishment" element={<Establishment />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
