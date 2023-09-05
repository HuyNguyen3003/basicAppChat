let adminServices = require("../services/userServices");
const { get } = require("../services/rabbitmq");

let checkserver = async (req, res) => {
  try {
    get("nodejsSend");
    return res.json("server ok");
  } catch (e) {
    console.log(e);
  }
};
let sendData = async (req, res) => {
  try {
    const data = req.body;
    const respone = await adminServices.sendData(data);
    if (respone) return res.json(respone);
    else return res.json(false);
  } catch (e) {
    console.log(e);
  }
};

let readData = async (req, res) => {
  try {
    const data = req.body;

    const respone = await adminServices.readData(data);
    if (respone) return res.json(respone);
    else return res.json(false);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  checkserver,
  sendData,
  readData,
};
