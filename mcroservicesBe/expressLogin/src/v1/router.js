const express = require("express");
const router = express.Router();
const adminController = require("./controllers/adminController");
const productController = require("./controllers/productController");
const pageController = require("./controllers/pageController");
const activiController = require("./controllers/activiController");

let initWebRoutes = (app) => {
  //
  router.post("/login", adminController.login);

  //product
  router.get("/product", productController.getAll);
  router.post("/productId", productController.getId);
  router.post("/product/update", productController.update);
  router.post("/product/delete", productController.Delete);
  router.post("/product/sendmailBuy", productController.sendMail);
  //page
  router.get("/page", pageController.getAll);
  router.post("/pageId", pageController.getId);
  router.post("/page/update", pageController.update);
  router.post("/page/delete", pageController.Delete);
  //activi
  router.get("/activi", activiController.getAll);
  router.post("/activiId", activiController.getId);
  router.post("/activi/create", activiController.create);
  router.post("/activi/deleteId", activiController.deleteId);

  return app.use("/", router);
};

module.exports = initWebRoutes;
