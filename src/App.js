import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ViewPDF from "./pages/studentScreens/ViewPDF";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Home />} />
        <Route path="/viewresume" element={<ViewPDF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
