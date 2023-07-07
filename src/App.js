import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import StudentApplications from "./pages/studentScreens/StudentApplications";
import StudentHome from "./pages/studentScreens/StudentHome";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/applications" element={<StudentApplications />} />
        <Route path="/home" element={<StudentHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
