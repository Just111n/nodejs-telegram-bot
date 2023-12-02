const axios = require("axios");

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

module.exports.sendMessage = async (chatId, message) => {
    try {
      await axios.post(TELEGRAM_API, {
        chat_id: chatId,
        text: message,
      });
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };