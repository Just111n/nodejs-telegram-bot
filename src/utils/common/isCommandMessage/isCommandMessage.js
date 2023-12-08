const COMMAND_PREFIX = "/";

/**
 * Checks if a given text is a command.
 * @param {string} text - The text to check.
 * @returns {boolean} - True if the text is a command, false otherwise.
 */
function isCommandMessage(text) {
  return text.startsWith(COMMAND_PREFIX);
}

module.exports = {
  isCommandMessage,
};
