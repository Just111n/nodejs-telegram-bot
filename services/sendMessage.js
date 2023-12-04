const axios = require("axios");
const { TELEGRAM_API } = require("./constants");

module.exports.sendMessage = async (chatId, message) => {
  try {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
};
