const express = require("express");
const emailRouter = express.Router();

//route to read our cookies after loggin in
emailRouter.route("/email").get(async (req, res) => {
  try {
    return res.json("This is the email page");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = emailRouter;
