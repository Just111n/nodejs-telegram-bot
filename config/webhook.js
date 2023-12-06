const axios = require("axios");

async function setUpWebhook() {
  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook`,
      {
        url: `${process.env.SERVER_URL}/webhook/${process.env.BOT_TOKEN}`,
      }
    );
    console.log("Webhook Connected...");
  } catch (error) {
    console.error(error);
  }
}

module.exports = setUpWebhook;
