require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const {
  handleStartCommand,
  handleIdCommand,
  handleMessageCommand,
  handleUnknownCommand,
} = require("./controller/commandHandlers");
const { handleInlineQuery } = require("./controller/inlineQueryHandlers");

const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(BOT_TOKEN);
bot.setWebHook(`${process.env.WEBHOOK_URL}/bot${BOT_TOKEN}`);

connectDB();

function registerBotEvents() {
  bot.onText(/\/start/, handleStartCommand(bot));
  bot.onText(/\/id (.+)/, handleIdCommand(bot));
  bot.on("message", handleMessageCommand(bot));
  bot.onText(/\/(?!start|id\s)(.+)/, handleUnknownCommand(bot));
}

registerBotEvents();

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Bot is running with webhook setup...");
});
