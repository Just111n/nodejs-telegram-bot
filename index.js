require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
require("./controllers/commandHandlers/commandHandlers");
const setUpWebhook = require("./config/webhook");
const botRouter = require("./api/bot/botRouter");
const emailRouter = require("./api/email/emailRouter");
const { createTransport } = require("./config/emailTransport");
const { SETUP_WEBHOOK_URL, DEFAULT_URI } = require("./routes/route.constants");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());

connectDB();
setUpWebhook();
createTransport();

app.get(DEFAULT_URI, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(botRouter);
app.use(emailRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Bot is running with webhook at: ${SETUP_WEBHOOK_URL}`);
});

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});
