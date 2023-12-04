require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./database");
const {
  handleStartCommand,
  handleMessageCommand,
  handleUnknownCommand,
  handleFeedbackCommand,
  handleIdCommand,
} = require("./controller/commandHandlers/commandHandlers");
const setUpWebhook = require("./webhook");
const botRouter = require("./api/bot/botRouter");
const emailRouter = require("./api/email/emailRouter");

const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 8000;
const WEBHOOK_URI = `/webhook/${BOT_TOKEN}`;
const WEBHOOK_URL = `${process.env.SERVER_URL}${WEBHOOK_URI}`;

const app = express();
app.use(bodyParser.json());

connectDB();
setUpWebhook();


app.get("/", (req, res) => {
  // Send the index.html file
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api", botRouter);
app.use("/api", emailRouter);

app.post(WEBHOOK_URI, async (req, res) => {
  try {
    const update = req.body;

    const chatId = update.message.chat.id;
    const incomingMessage = update.message.text;

    console.log("ChatId:", chatId, "Incoming Message:", incomingMessage);

    // Handle /start command
    if (/\/start/.test(incomingMessage)) {
      await handleStartCommand({ chatId });
    }
    // Handle /id command
    else if (/\/id (.+)/.test(incomingMessage)) {
      const match = /\/id (.+)/.exec(incomingMessage);
      await handleIdCommand({ chatId, match });
    }
    // Handle /feedback command
    else if (/\/feedback (.+)/.test(incomingMessage)) {
      const match = /\/feedback (.+)/.exec(incomingMessage);
      await handleFeedbackCommand({ chatId, match });
    }

    // Handle other unknown commands
    else if (/\/(?!start|id|feedback\s)(.+)/.test(incomingMessage)) {
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

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});
