const express = require("express");
const webhook = require("./controllers/webhook");
const info = require("./controllers/info");
const processWebhookUpdate = require("./controllers/telegramWebhookHandler");
const {
  BOT_WEBHOOK_INFO_URI,
  BOT_INFO_URI,
  WEBHOOK_URI,
} = require("../route.constants");
const botRouter = express.Router();

botRouter.route(BOT_WEBHOOK_INFO_URI).get(webhook);

botRouter.route(BOT_INFO_URI).get(info);

botRouter.route(WEBHOOK_URI).post(processWebhookUpdate);

module.exports = botRouter;
