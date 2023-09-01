let adminServices = require("../services/adminServices");

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

module.exports = {
  login,
};
