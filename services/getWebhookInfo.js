const axios = require("axios");
const { TELEGRAM_API } = require("./constants");

module.exports.getWebhookInfo = async () => {
  try {
    const response = await axios.get(`${TELEGRAM_API}/getWebhookInfo`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bot info:", error.message);
    return null;
  }
};
