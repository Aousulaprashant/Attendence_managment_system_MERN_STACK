import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [loginD, setLoginD] = useState({
    studentId: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLodininput = (e) => {
    const { name, value } = e.target;
    setLoginD((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", loginD);

      const { success, message } = response.data;
      console.log(response.data);

      console.log(loginD);
      if (success) {
        console.log(" if block exicuted");
      } else {
        if (loginD.studentId === "Admin1") {
          navigate("/AdminHome");
        } else {
          alert("login sucessful !!");
          navigate("/currentstudent", { state: { id: loginD.studentId } });
        }
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
    setLoginD({
      studentId: "",
      password: "",
    });
  };
  return (
    <div>
      <div className="login-div">
        <h1>LOGIN HERE</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="inputfileds"
            name="studentId"
            placeholder="ENTER USER ID ..."
            onChange={handleLodininput}
          />
          <br />
          <input
            type="password"
            name="password"
            className="inputfileds"
            placeholder=" ENTER PASSWORD"
            value={loginD.password}
            onChange={handleLodininput}
          />
          <br />
          <button className="submitbnt" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
