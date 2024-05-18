import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const CurrentStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [attendence, setattendence] = useState("");
  const username = location.state?.id;
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/students/${username}/attendance`
        );
        console.log(response.data.data.attendancePercentage);
        setattendence(response.data.data.attendancePercentage);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudent();
  }, [username]);
  return (
    <div>
      <h1>
        WEllcome {username} Ur Attendece percentage Till Date is {attendence}
      </h1>
    </div>
  );
};

export default CurrentStudent;
