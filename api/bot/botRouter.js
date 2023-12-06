const express = require("express");
const webhook = require("./routes/webhook");
const bot = require("./routes/info");
const botRouter = express.Router();

botRouter.route("/webhook").get(webhook);

botRouter.route("/info").get(bot);

module.exports = botRouter;
