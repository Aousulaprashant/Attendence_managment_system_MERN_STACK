const express = require("express");
const Attendance = require("../db/Attendence");
const Student = require("../db/Student");

const router = express.Router();

// Mark Attendance
router.post("/", async (req, res) => {
  const { studentId, attendanceDate, attendanceStatus } = req.body;

  const student = await Student.findOne({ studentId: studentId });

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const attendance = new Attendance({
    studentId,
    attendanceDate,
    attendanceStatus,
  });

  try {
    const savedAttendance = await attendance.save();
    res.json(savedAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Attendance Percentage
router.get("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const attendance = await Attendance.find({ studentId });
    const totalDays = attendance.length;
    const presentDays = attendance.filter(
      (att) => att.attendanceStatus === "Present"
    ).length;
    const attendancePercentage = Math.round((presentDays / totalDays) * 100);

    const student = await Student.findOneAndUpdate(
      { studentId },
      { attendancePercentage },
      { new: true, upsert: true }
    );

    res.json({ student });
  } catch (error) {
    res.status(500).json({ message: error.message, ss: "sssssssssss" });
  }
});

module.exports = router;
