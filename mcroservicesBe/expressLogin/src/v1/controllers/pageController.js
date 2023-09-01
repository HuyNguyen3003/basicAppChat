let pageServices = require("../services/pageServices");

let getAll = async (req, res) => {
  try {
    const respone = await pageServices.getAll();
    if (respone) return res.json(respone);
    else return res.json("fail");
  } catch (e) {
    console.log(e);
  }
};

let update = async (req, res) => {
  try {
    const data = req.body;
    const respone = await pageServices.update(data);
    if (respone) return res.json(respone);
    else return res.json("fail");
  } catch (e) {
    console.log(e);
  }
};

let Delete = async (req, res) => {
  try {
    const data = req.body;
    const respone = await pageServices.Delete(data);
    if (respone) return res.json(respone);
    else return res.json("fail");
  } catch (e) {
    console.log(e);
  }
};

let getId = async (req, res) => {
  try {
    const data = req.body;

    const respone = await pageServices.getId(data._id);
    if (respone) return res.json(respone);
    else return res.json("fail");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAll,
  update,
  Delete,
  getId,
};
