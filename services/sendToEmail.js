const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "278614671497-1588ccfcgab63bgr3q4siio5c725kog2.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04wjFnZyKRDD2CgYIARAAGAQSNwF-L9Irf1zpeAwPfdYECU4RuN1twlnJjpoijUtJub5GEhnzkDsW-A90sGXMcOCzzt75XqkuupQ";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendToEmail(feedback, recipientEmail) {
  try {
    console.log("inside sendToEmail function");

    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL,
      to: recipientEmail,
      subject: "Feedback from Telegram Bot",
      text: feedback,
    };
    let info = await transport.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error.message);
  }
}

module.exports = {
  sendToEmail,
};
