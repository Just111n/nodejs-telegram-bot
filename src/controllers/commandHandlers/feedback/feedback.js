/* eslint-disable no-unused-vars */
const { sendMessage } = require("../../../services/sendMessage");
const { sendToEmail } = require("../../../services/sendToEmail");

module.exports.handleFeedbackCommand = async ({ chatId, match }) => {
  try {
    const feedback = match[1];
    await sendMessage(
      chatId,
      "Please wait a moment, sending your feedback to the developer..."
    );
    const recipientEmail = process.env.GMAIL; // Set the recipient's email address
    await sendToEmail(feedback, recipientEmail);
    await sendMessage(
      chatId,
      "📧 Feedback sent to developer! Big thanks for your input! 😊👍"
    );
  } catch (error) {
    await sendMessage(chatId, `Error: ${error.message}`);
  }
};
