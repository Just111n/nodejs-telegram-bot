const express = require("express");
const { EMAIL_URI } = require("../route.constants");
const emailRouter = express.Router();

//route to read our cookies after loggin in
emailRouter.route(EMAIL_URI).get(async (req, res) => {
  try {
    return res.json("This is the email page");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = emailRouter;
