const studentService = require("../services/studentService");
const {
  isCommandMessage,
  getStudentsMessage,
} = require("../utils/studentUtils");

const NO_STUDENTS_MESSAGE = "No students found with that name"

module.exports.handleStartCommand = (bot) => (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "I'm a bot, please talk to me!\nType a name to find their student id");
  
};

module.exports.handleIdCommand = (bot) => async (msg, match) => {
  const chatId = msg.chat.id;
  try {
    const studentId = match[1];
    const name = await studentService.getOutputFromStudentId(studentId);
    bot.sendMessage(chatId, name);
    
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
};

module.exports.handleMessageCommand = (bot) => async (msg) => {
  const { chat, text } = msg;
  try {
    if (isCommandMessage(text)) return;

    const students = await studentService.getStudentsByName(text);
    const message =
      students.length > 0 ? getStudentsMessage(students) : NO_STUDENTS_MESSAGE;

    bot.sendMessage(chat.id, message);
  } catch (error) {
    bot.sendMessage(chat.id, error.message);
  }
};

module.exports.handleUnknownCommand = (bot) => (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Sorry, I didn't understand that command.");
};
