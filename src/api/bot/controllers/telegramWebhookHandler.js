const {
  handleStartCommand,
  handleMessageCommand,
  handleUnknownCommand,
  handleFeedbackCommand,
  handleIdCommand,
  handleHelpCommand,
} = require("../../../controllers/commandHandlers/commandHandlers");

async function processWebhookUpdate(req, res) {
  try {
    console.log(req);
    const update = req.body;
    const chatId = update.message.chat.id;
    const incomingMessage = update.message.text;

    console.log("ChatId:", chatId, "Incoming Message:", incomingMessage);

    if (/^\/start$/.test(incomingMessage)) {
      await handleStartCommand({ chatId });
    } else if (/^\/id (.+)/.test(incomingMessage)) {
      const match = /^\/id (.+)/.exec(incomingMessage);
      await handleIdCommand({ chatId, match });
    } else if (/^\/feedback (.+)/.test(incomingMessage)) {
      const match = /^\/feedback (.+)/.exec(incomingMessage);
      await handleFeedbackCommand({ chatId, match });
    } else if (/^\/help$/.test(incomingMessage)) {
      await handleHelpCommand({ chatId });
    } else if (/^\/(?!start|id|feedback|help)(.+)/.test(incomingMessage)) {
      await handleUnknownCommand({ chatId });
    } else {
      await handleMessageCommand({ chatId, text: incomingMessage });
    }

    res.status(200).send("ok");
  } catch (error) {
    console.error("Error in processWebhookUpdate: " + error.message);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = processWebhookUpdate;
