const axios = require("axios");
const { SETUP_WEBHOOK_URL } = require("../api/route.constants");

async function setUpWebhook() {
  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook`,
      {
        url: SETUP_WEBHOOK_URL,
      }
    );
    console.log("Webhook Connected...");
  } catch (error) {
    console.error(error);
  }
}

module.exports = setUpWebhook;
