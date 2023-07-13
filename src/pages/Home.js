import React from "react";
import StudentHome from "./studentScreens/StudentHome";
import RecruiterHome from "./recruiterScreens/RecruiterHome";

function Home() {
  const role = localStorage.getItem("role");
  let HomeElement;
  if (role === "student") {
    HomeElement = <StudentHome />;
  }
  if (role === "recruiter") {
    HomeElement = <RecruiterHome />;
  }
  return HomeElement;
}

export default Home;
