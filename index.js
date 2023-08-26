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
const WEBHOOK_URI = `/webhook/${BOT_TOKEN}`;
const WEBHOOK_URL = `${process.env.SERVER_URL}${WEBHOOK_URI}`;

const app = express();
app.use(bodyParser.json());

try {
  connectDB();
} catch (err) {
  console.error("Failed to connect to MongoDB:", err.message);
  process.exit(1);
}

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post(WEBHOOK_URI, async (req, res) => {
  try {
    const update = req.body;
    console.log(update);

    const chatId = update.message.chat.id;
    const incomingMessage = update.message.text;

    // Handle /start command
    if (/\/start/.test(incomingMessage)) {
      await handleStartCommand({ chatId });
    } 
    // Handle /id command
    else if (/\/id (.+)/.test(incomingMessage)) {
      const match = /\/id (.+)/.exec(incomingMessage);
      await handleIdCommand({ chatId, match });
    } 
    // Handle other unknown commands
    else if (/\/(?!start|id\s)(.+)/.test(incomingMessage)) {
      await handleUnknownCommand({ chatId });
    } 
    // Handle generic messages
    else {
      await handleMessageCommand({ chatId, text: incomingMessage });
    }

    res.status(200).send("ok");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Bot is running with webhook at: ${WEBHOOK_URL}`);
});
