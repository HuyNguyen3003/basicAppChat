let create = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data.username === "admin" && data.password === "12345") {
        res = true;
        resolve(res);
      } else {
        res = false;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let login = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data.username === "admin" && data.password === "12345") {
        res = true;
        resolve(res);
      } else {
        res = false;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let update = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data.username === "admin" && data.password === "12345") {
        res = true;
        resolve(res);
      } else {
        res = false;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { create, login, update };
