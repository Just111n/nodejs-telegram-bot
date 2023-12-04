/**
 * Formats the student data into a string.
 * @param {Object} student - The student object.
 * @param {string} student.studentId - The student's ID.
 * @param {string} student.name - The student's name.
 * @returns {string} - Formatted string of student data.
 */
function getOutputFromStudent({ studentId, name }) {
  return `${studentId} ${name}`;
}

// Export the functions
module.exports = {
  getOutputFromStudent,
};
