import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./page/Dashboard";
import Detail from "./page/Detail";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import About from "./page/About";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import Input from "./page/Input";
import Edit from "./page/Edit";
import AddStudent from "./page/Add";

function App() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto p-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/input" element={<Input />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/add" element={<AddStudent/>} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
