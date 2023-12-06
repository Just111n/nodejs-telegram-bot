const { getBotInfo } = require("../../../services/getBotInfo");

const info = async (req, res) => {
  try {
    const data = await getBotInfo();
    return res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = info;
