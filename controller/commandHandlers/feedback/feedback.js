const { sendMessage } = require("../../../services/sendMessage");

module.exports.handleFeedbackCommand = async ({ chatId, match }) => {
  try {
    const feedback = match[1];
    // sendToEmail(feedback)
    await sendMessage(chatId, feedback);
  } catch (error) {
    await sendMessage(chatId, `Error: ${error.message}`);
  }
};
