import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./page/Dashboard";
import Detail from "./page/Detail";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import About from "./page/About";
function App() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto p-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
