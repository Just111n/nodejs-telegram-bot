const { sendMessage } = require("../../../services/sendMessage");

const COMMANDS = [
  {
    command: "/start",
    description: "Start interacting with the bot",
  },
  {
    command: "/id",
    description: "Get student ID by name",
    usage: "/id [student name]",
  },
  {
    command: "/feedback",
    description: "Send feedback about the bot",
    usage: "/feedback [message]",
  },
  {
    command: "/help",
    description: "Get help and information about the bot commands",
  },
  {
    command: "Search by Name",
    description: "Type a student's name to search for their information",
    usage: "[student name]",
  },
  // Add other commands here as needed
];

module.exports.handleHelpCommand = async ({ chatId }) => {
  try {
    let helpMessage =
      "🤖 *Bot Commands Help*\nHere are the commands you can use:\n\n";

    COMMANDS.forEach((cmd) => {
      helpMessage += `${cmd.command} - ${cmd.description}\n`;
      if (cmd.usage) {
        helpMessage += `Usage: ${cmd.usage}\n`;
      }
      helpMessage += "\n"; // Add a newline for readability
    });

    await sendMessage(chatId, helpMessage);
  } catch (error) {
    await sendMessage(chatId, `Error: ${error.message}`);
  }
};
