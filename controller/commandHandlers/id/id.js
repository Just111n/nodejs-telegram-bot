const { sendMessage } = require("../../../services/sendMessage");
const studentService = require("../../../services/studentService");

module.exports.handleIdCommand = async ({ chatId, match }) => {
  try {
    const studentId = match[1];
    const name = await studentService.getOutputFromStudentId(studentId);
    await sendMessage(chatId, name);
  } catch (error) {
    await sendMessage(chatId, `Error: ${error.message}`);
  }
};
