const studentService = require("../../services/studentService");
const {
  getStudentsMessage,
} = require("../../utils/student/getStudentsMessage/getStudentsMessage");

const NO_STUDENTS_MESSAGE = "No students found with that name";

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
