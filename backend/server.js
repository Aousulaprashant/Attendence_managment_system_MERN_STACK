const express = require("express");
const mongoose = require("mongoose");
const students = require("./routers/student");
const attendance = require("./routers/attendence");
const User = require("./db/Student");

const cors = require("cors");

const app = express();

app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Attendence_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Middleware
app.use(express.json());

app.post("/login", async (req, res) => {
  try {
    const { studentId, password } = req.body;

    const user = await User.findOne({ studentId });

    if (!user) {
      return res.status(401), json({ error: "invalid user name or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "invalid password" });
    }

    res.status(200).json({ message: "login has success" });
  } catch (error) {
    res.status(200).json({ error: "login has failed!!" });
  }
});

// Routes
app.use("/api/students", students);
app.use("/api/attendance", attendance);

// Start server
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
