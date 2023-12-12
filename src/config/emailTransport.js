const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

let transport;

async function createTransport() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    transport = nodemailer.createTransport({
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
    console.log("Email API Connected...");
  } catch (error) {
    console.error("Error creating email transport: " + error.message);
  }
}

async function getTransport() {
  if (!transport) {
    await createTransport(); // Initialize transport if it's not already created
  }
  return transport;
}


module.exports = { createTransport, getTransport };
