const DEFAULT_URI = "/";

const WEBHOOK_URI = `/api/bot/webhook/${process.env.BOT_TOKEN}`;
const SETUP_WEBHOOK_URL = `${process.env.SERVER_URL}${WEBHOOK_URI}`;

const BOT_WEBHOOK_INFO_URI = "/api/bot/webhook";
const BOT_INFO_URI = "/api/bot/info";

const EMAIL_URI = "/api/email";

module.exports = {
  DEFAULT_URI,
  BOT_WEBHOOK_INFO_URI,
  BOT_INFO_URI,
  SETUP_WEBHOOK_URL,
  WEBHOOK_URI,
  EMAIL_URI,
};
