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

// Constants
const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 5000;

// const app = express();

// Middleware to parse the updates received from Telegram
// app.use(bodyParser.json());

// Initialize bot and connect to database
function initializeBot() {
  connectDB();

  const bot = new TelegramBot(BOT_TOKEN, { polling: true });
  console.log("Bot is running...");

  registerBotEvents(bot);
}

function registerBotEvents(bot) {
  bot.onText(/\/start/, handleStartCommand(bot));
  bot.onText(/\/id (.+)/, handleIdCommand(bot));
  bot.on("message", handleMessageCommand(bot));

  // Inline Query for Student ID
  // bot.on("inline_query", handleInlineQuery(bot));

  bot.onText(/\/(?!start|id\s)(.+)/, handleUnknownCommand(bot));

  // This order ensures that the specific command handlers are checked first, and the generic ones later.
}

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});

// Start the bot
initializeBot();

// app.get(`/`, (req, res) => {
  
//   res.send("hello world");
// });

// // Start the Express server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
