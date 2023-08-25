const studentService = require("../services/studentService");
const {
  isCommandMessage,
  getStudentsMessage,
} = require("../utils/studentUtils");

// Uncomment and import any required dependencies

const handleInlineQuery = (bot) => async (query) => {
  const name = query.query.slice(5);
  const students = await studentService.getStudentsByName(name);
  const message =
    students.length > 0 ? getStudentsMessage(students) : NO_STUDENTS_MESSAGE;

  bot.answerInlineQuery(query.id, message);
};

module.exports = {
  handleInlineQuery,
};
