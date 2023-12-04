const studentService = require("../../services/studentService");
const { sendMessage } = require("../../services/sendMessage");
const {
  isCommandMessage,
} = require("../../utils/common/isCommandMessage/isCommandMessage");
const {
  getStudentsMessage,
} = require("../../utils/student/getStudentsMessage/getStudentsMessage");
const { handleFeedbackCommand } = require("./feedback/feedback");
const { handleStartCommand } = require("./start/start");
const { handleIdCommand } = require("./id/id");

const NO_STUDENTS_MESSAGE = "No students found with that name";

const handleMessageCommand = async ({ chatId, text }) => {
  try {
    if (isCommandMessage(text)) return;

    const students = await studentService.getStudentsByName(text);
    const message =
      students.length > 0 ? getStudentsMessage(students) : NO_STUDENTS_MESSAGE;

    await sendMessage(chatId, message);
  } catch (error) {
    await sendMessage(chatId, error.message);
  }
};

const handleUnknownCommand = async ({ chatId }) => {
  await sendMessage(chatId, "Sorry, I didn't understand that command.");
};

module.exports = {
  handleStartCommand,
  handleIdCommand,
  handleFeedbackCommand,
  handleMessageCommand,
  handleUnknownCommand,
};
