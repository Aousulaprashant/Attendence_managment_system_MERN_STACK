import React from "react";
import StudentsList from "./StudentsList";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div>
      <Link to="/mark-attendance">Mark Attendence</Link>
      <StudentsList />
    </div>
  );
};

export default AdminHome;
