if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./.env.local" });
  console.log("in dev mode");
} else {
  require("dotenv").config();
}

const TelegramBot = require("node-telegram-bot-api");
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
