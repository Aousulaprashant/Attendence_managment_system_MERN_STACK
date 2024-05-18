import React, { useState, useEffect } from "react";
import axios from "axios";
const MarkAttendenc = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

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

  const handleAttendanceChange = (studentId, attendanceStatus) => {
    if (attendanceStatus) {
      setAttendance([...attendance, studentId]);
    } else {
      setAttendance(attendance.filter((id) => id !== studentId));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const promises = students.map(async (student) => {
        if (attendance.includes(student.studentId)) {
          const attendanceData = {
            studentId: student.studentId,
            attendanceDate: new Date().toISOString(),
            attendanceStatus: "Present",
          };

          await axios
            .post("http://localhost:5000/api/attendance", attendanceData)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
          await axios
            .get(`http://localhost:5000/api/attendance/${student.studentId}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
          console.log(student.studentId);
        } else {
          const attendanceData = {
            studentId: student.studentId,
            attendanceDate: new Date().toISOString(),
            attendanceStatus: "Absent",
          };

          await axios
            .post("http://localhost:5000/api/attendance", attendanceData)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });

          await axios
            .get(`http://localhost:5000/api/attendance/${student.studentId}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
          console.log(student.studentId);
        }
      });
      await Promise.all(promises);
      alert("Attendance marked successfully");
    } catch (error) {
      console.error(error);
      alert("Error marking attendance");
    }
  };

  return (
    <div>
      <h1>Mark Attendance</h1>
      <form onSubmit={handleSubmit}>
        {students.map((student) => (
          <div key={student.studentId}>
            <label>
              {student.name}
              <input
                type="checkbox"
                checked={attendance.includes(student.studentId)}
                onChange={(e) =>
                  handleAttendanceChange(student.studentId, e.target.checked)
                }
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default MarkAttendenc;
