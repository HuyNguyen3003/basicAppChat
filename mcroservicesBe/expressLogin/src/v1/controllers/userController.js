let adminServices = require("../services/userServices");

let checkserver = async (req, res) => {
  try {
    return res.json("server ok");
  } catch (e) {
    console.log(e);
  }
};
let create = async (req, res) => {
  try {
    const data = req.body;
    const respone = await adminServices.create(data);
    if (respone) return res.json(respone);
    else return res.json(false);
  } catch (e) {
    console.log(e);
  }
};

let login = async (req, res) => {
  try {
    const data = req.body;

    const respone = await adminServices.login(data);
    if (respone) return res.json(respone);
    else return res.json(false);
  } catch (e) {
    console.log(e);
  }
};
let update = async (req, res) => {
  try {
    const data = req.body;

    const respone = await adminServices.update(data);
    if (respone) return res.json(respone);
    else return res.json(false);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  checkserver,
  create,
  login,
  update,
};
