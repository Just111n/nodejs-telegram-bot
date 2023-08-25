require("dotenv").config({ path: "./.env.local" });

const TelegramBot = require("node-telegram-bot-api");
const connectDB = require("./db");
// const class_2025 = require('./p_excel'); // Assuming p_excel exports a module like class_2025
// const botName = process.env.BOT_NAME;
const studentService = require("./services/studentService");
const { getOutputFromStudent } = require("./utils/studentUtils");

console.log("Bot is running...");

connectDB();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// // Start Command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "I'm a bot, please talk to me!");
});

// // ID Command
bot.onText(/\/id (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const studentId = match[1];
  const name = await studentService.getNameFromStudentId(studentId);
  bot.sendMessage(chatId, name);
});

// Inline Query for Student ID
// bot.on("inline_query", async (query) => {
//   const name = query.query.slice(5);
//   //   const studentId = await class_2025.get_id_from_name(name);
//   const sutdentId = "1005879";

//   const results = [
//     {
//       type: "article",
//       id: query.id,
//       title: "Student ID",
//       input_message_content: {
//         message_text: studentId,
//       },
//     },
//   ];
//   bot.answerInlineQuery(query.id, results);
// });

// // Message handler for finding ID from name
bot.on("message", async (msg) => {
  try {
    const chatId = msg.chat.id;
    let result = "";
    if (!msg.text.startsWith("/")) {
      // If message is not a command
      const name = msg.text;
      const students = await studentService.findStudentsByName(name);

      if (students.length === 0) {
        bot.sendMessage(chatId, "No students detected");
      } else {
        for (let i = 0; i < students.length; i++) {
          const student = students[i];
          const res = getOutputFromStudent(student);
          result += res + "\n";
        }

        bot.sendMessage(chatId, result);
      }
    }
  } catch (error) {
    bot.sendMessage(chatId, error.message);
  }
});

// // Unknown command
bot.onText(/\/(.+)/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Sorry, I didn't understand that command.");
});

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});
