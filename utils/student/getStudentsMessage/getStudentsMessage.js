const {
  getOutputFromStudent,
} = require("../getOutputFromStudent/getOutputFromStudent");

/**
 * Generates a message string from a list of students.
 * @param {Array} students - Array of student objects.
 * @returns {string} - A string with each student's information on a new line.
 */

function getStudentsMessage(students) {
  return students.map(getOutputFromStudent).join("\n");
}

module.exports = {
  getStudentsMessage,
};
