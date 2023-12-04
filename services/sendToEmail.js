const nodemailer = require("nodemailer");

async function sendToEmail(feedback, recipientEmail) {
  console.log("inside sendToEmail function");
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "justinlooijw@gmail.com",
      pass: "myrealpassword",
    },
  });

  let mailOptions = {
    from: "justinlooijw@gmail.com",
    to: recipientEmail,
    subject: "Feedback from Telegram Bot",
    text: feedback,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error.message);
  }
}

module.exports = {
  sendToEmail,
};
