require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
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
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const WEBHOOK_URI = `/webhook/${BOT_TOKEN}`;
const WEBHOOK_URL = `${process.env.SERVER_URL}${WEBHOOK_URI}`; // Corrected to use env

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(BOT_TOKEN); // This configures bot to use webhook

try {
  connectDB();
} catch (err) {
  console.error("Failed to connect to MongoDB:", err.message);
  process.exit(1); // Exit the application if DB connection fails
}

bot.onText(/\/start/, handleStartCommand(bot));
bot.onText(/\/id (.+)/, handleIdCommand(bot));
bot.on("message", handleMessageCommand(bot));
bot.onText(/\/(?!start|id\s)(.+)/, handleUnknownCommand(bot));

bot.setWebHook(WEBHOOK_URL);

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

// Handling updates from Telegram via the webhook route
app.post(WEBHOOK_URI, async (req, res) => {
  try {
    console.log(req.body);
    bot.processUpdate(req.body); // Let the bot process the update
    res.status(200).send("ok"); // Responding with 200 to acknowledge receipt of the update
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Bot is running with webhook at: ${WEBHOOK_URL}`);
});
