const { send } = require("./rabbitmq");

let sendData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      send("nodejsSend", JSON.stringify(data));
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

let readData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { sendData, readData };
