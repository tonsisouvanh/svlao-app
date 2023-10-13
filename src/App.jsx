import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  About,
  StudentDetail,
  NotFoundPage,
  StudentList,
  Profile,
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
          <Route path="/about" element={<About />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
