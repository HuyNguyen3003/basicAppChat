let activiServices = require("../services/activiServices");

let getAll = async (req, res) => {
  try {
    const respone = await activiServices.getAll();
    if (respone) return res.json(respone);
    else return res.json("fail");
  } catch (e) {
    console.log(e);
  }
};

let getId = async (req, res) => {
  try {
    const data = req.body;

    const respone = await activiServices.getId(data);
    if (respone) return res.json(respone);
    else return res.json("fail");
  } catch (e) {
    console.log(e);
  }
};

let create = async (req, res) => {
  try {
    const data = req.body;

    const respone = await activiServices.create(data);
    if (respone) return res.json(respone);
    else return res.json("fail");
  } catch (e) {
    console.log(e);
  }
};

let deleteId = async (req, res) => {
  try {
    const id = req.body;
    const respone = await activiServices.deleteId(id);
    if (respone) return res.json(respone);
    else return res.json("fail");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAll,
  getId,
  create,

  deleteId,
};
