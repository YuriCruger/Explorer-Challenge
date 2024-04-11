const { Router } = require("express");

const OrdersController = require("../controller/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create);
ordersRoutes.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization("admin"),
  ordersController.index
);
ordersRoutes.patch(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization("admin"),
  ordersController.update
);
ordersRoutes.delete(
  "/:order_id",
  ensureAuthenticated,
  verifyUserAuthorization("admin"),
  ordersController.delete
);

module.exports = ordersRoutes;
