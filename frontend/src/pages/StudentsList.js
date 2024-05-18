import React, { useState, useEffect } from "react";
import axios from "axios";
import "./studentList.css";
const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Students List</h1>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Attendance Percentage</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.attendancePercentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
