import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Dashboard, About, StudentDetail, NotFoundPage } from "./page";
import RootLayoutPublic from "./components/layout/public/rootLayoutPublic";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayoutPublic />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<StudentDetail />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
