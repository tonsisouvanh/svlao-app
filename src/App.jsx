import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Dashboard, About, StudentDetail } from "./page";
import RootLayoutPublic from "./components/layout/public/rootLayoutPublic";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RootLayoutPublic>
              <Dashboard />
            </RootLayoutPublic>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <RootLayoutPublic>
              <StudentDetail />
            </RootLayoutPublic>
          }
        />
        <Route
          path="/about"
          element={
            <RootLayoutPublic>
              <About />
            </RootLayoutPublic>
          }
        />
      </Routes>
    </>
  );
}

export default App;
