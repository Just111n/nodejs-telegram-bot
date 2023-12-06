const { getWebhookInfo } = require("../../../services/getWebhookInfo");

const webhook = async (req, res) => {
  try {
    const data = await getWebhookInfo();
    return res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = webhook;
