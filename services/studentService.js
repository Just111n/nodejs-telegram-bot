const Student = require("../models/student");
const { getOutputFromStudent } = require("../utils/studentUtils");

exports.getOutputFromStudentId = async (studentId) => {
  try {
    const student = await Student.findOne({
      studentId: parseInt(studentId, 10),
    });

    if (student) {
      return getOutputFromStudent(student);
    } else {
      return "Student not Found";
    }
  } catch (err) {
    console.error("Error fetching students by student id:", error);
    throw error;
  }
};

// Assuming you have a Student model defined somewhere like this:

module.exports.getStudentsByName = async (inputName) => {
  try {
    // Case-insensitive search using $regex
    const students = await Student.find({
      name: { $regex: new RegExp(inputName, "i") },
    });
    return students;
  } catch (error) {
    console.error("Error fetching students by name:", error);
    throw error;
  }
};