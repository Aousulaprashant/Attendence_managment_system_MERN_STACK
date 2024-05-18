// middlewares/attendanceMiddleware.js

const StudentAtt = require("../db/Student");

const updateAttendancePercentage = async (req, res, next) => {
  const studentId = req.params.studentId.toString();

  try {
    const student = await StudentAtt.find({ studentId: studentId });
    console.log(student[0]);

    const totalAttendances = student[0].attendances.length;
    const presentAttendances = student[0].attendances.filter(
      (a) => a.status === "present"
    ).length;
    console.log(student[0].attendances.length);
    const percentage = (presentAttendances / totalAttendances) * 100;

    student[0].attendancePercentage = 99;

    await student[0].save();
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  updateAttendancePercentage,
};
