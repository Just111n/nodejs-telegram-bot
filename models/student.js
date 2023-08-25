const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
