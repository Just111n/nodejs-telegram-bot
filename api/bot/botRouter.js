const { getBotInfo } = require("../../services/getBotInfo");
const express = require("express");
const botRouter = express.Router();

//route to read our cookies after loggin in
botRouter.route("/bot").get(async (req, res) => {
  try {
    const data = await getBotInfo();
    return res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = botRouter;
