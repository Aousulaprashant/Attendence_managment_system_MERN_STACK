const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  attendanceDate: {
    type: Date,
    required: true,
  },
  attendanceStatus: {
    type: String,
    required: true,
    enum: ["Present", "Absent"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attendencee", attendanceSchema);
