const { Router } = require("express");

const OrdersController = require("../controller/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);
ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/", verifyUserAuthorization("admin"), ordersController.index);
ordersRoutes.patch(
  "/",
  verifyUserAuthorization("admin"),
  ordersController.update
);
ordersRoutes.delete(
  "/:order_id",
  verifyUserAuthorization("admin"),
  ordersController.delete
);

module.exports = ordersRoutes;
