const { getTransport } = require("../config/emailTransport");

async function sendToEmail(feedback, recipientEmail) {
  try {
    const transport = getTransport(); // Reuse the existing transport

    const mailOptions = {
      from: `STUDENT NODEJS TELEGRAMBOT🤖<${process.env.GMAIL}>`,
      to: recipientEmail,
      subject: "Feedback from Student Telegram Bot",
      text: feedback,
    };
    let info = await transport.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error.message);
    throw error;
  }
}

module.exports = {
  sendToEmail,
};
