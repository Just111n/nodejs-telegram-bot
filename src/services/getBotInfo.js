const axios = require("axios");
const { TELEGRAM_API } = require("./service.constants");

module.exports.getBotInfo = async () => {
  try {
    const response = await axios.get(`${TELEGRAM_API}/getMe`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bot info:", error.message);
    return null;
  }
};
