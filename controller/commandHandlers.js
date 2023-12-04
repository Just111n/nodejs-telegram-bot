const studentService = require("../services/studentService");
const {
  isCommandMessage,
  getStudentsMessage,
} = require("../utils/studentUtils");
const { sendMessage } = require("../services/sendMessage");

const NO_STUDENTS_MESSAGE = "No students found with that name";

module.exports.handleStartCommand = async ({ chatId }) => {
  await sendMessage(
    chatId,
    "I'm a bot, please talk to me!\nType a name to find their student id"
  );
};

module.exports.handleIdCommand = async ({ chatId, match }) => {
  try {
    const studentId = match[1];
    const name = await studentService.getOutputFromStudentId(studentId);
    await sendMessage(chatId, name);
  } catch (error) {
    await sendMessage(chatId, `Error: ${error.message}`);
  }
};

module.exports.handleMessageCommand = async ({ chatId, text }) => {
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

module.exports.handleUnknownCommand = async ({ chatId }) => {
  await sendMessage(chatId, "Sorry, I didn't understand that command.");
};
