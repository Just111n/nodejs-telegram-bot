const { sendMessage } = require("../../../services/sendMessage");

module.exports.handleStartCommand = async ({ chatId }) => {
  await sendMessage(
    chatId,
    "🌟 Hey there! I'm super excited to help you! 🚀 Just type in a name, and I'll quickly find their student ID for you. Let's make this fun and easy! 😊🌈 🌟"
  );
};
