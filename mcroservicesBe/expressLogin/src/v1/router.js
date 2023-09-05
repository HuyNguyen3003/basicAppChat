const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

let initWebRoutes = (app) => {
  //login
  router.get("/checkserver", userController.checkserver);
  router.post("/create", userController.create);
  router.post("/login", userController.login);
  router.post("/update", userController.update);

  return app.use("/", router);
};

module.exports = initWebRoutes;
