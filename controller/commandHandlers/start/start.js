const { sendMessage } = require("../../../services/sendMessage");

module.exports.handleStartCommand = async ({ chatId }) => {
  await sendMessage(
    chatId,
    "I'm a bot, please talk to me!\nType a name to find their student id"
  );
};
