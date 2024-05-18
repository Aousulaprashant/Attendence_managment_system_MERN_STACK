import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentsList from "./pages/StudentsList";
import Markattendence from "./pages/MarkAttendenc";
import PathConstants from "./PathConstants";
import Home from "./Home";
import AdminHome from "./pages/AdminHome";
import CurrentStudent from "./pages/CurrentStudent";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathConstants.STUDENTS_LIST} element={<StudentsList />} />
        <Route
          path={PathConstants.MARK_ATTENDANCE}
          element={<Markattendence />}
        />
        <Route path={PathConstants.AdminHome} element={<AdminHome />} />
        <Route path={PathConstants.LOGIN_FORM} element={<Home />} />
        <Route
          path={PathConstants.currentstudent}
          element={<CurrentStudent />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
