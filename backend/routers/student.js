const router = require("express").Router();
const Student = require("../db/Student");

// Get Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/attendance", async (req, res) => {
  const studentId = req.params.id;
  // Fetch student data from the database

  const student = await Student.findOne({ studentId });

  if (!student) {
    res.status(404).json({ message: "Student not found" });
    return;
  }
  // Return attendance percentage
  res.json({ data: student });
});

module.exports = router;
