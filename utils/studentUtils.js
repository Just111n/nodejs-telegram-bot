const COMMAND_PREFIX = "/";

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

/**
 * Generates a message string from a list of students.
 * @param {Array} students - Array of student objects.
 * @returns {string} - A string with each student's information on a new line.
 */
function getStudentsMessage(students) {
  return students.map(getOutputFromStudent).join("\n");
}

/**
 * Checks if a given text is a command.
 * @param {string} text - The text to check.
 * @returns {boolean} - True if the text is a command, false otherwise.
 */
function isCommandMessage(text) {
  return text.startsWith(COMMAND_PREFIX);
}

// Export the functions
module.exports = {
  getOutputFromStudent,
  getStudentsMessage,
  isCommandMessage,
};
