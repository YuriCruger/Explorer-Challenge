const { Router } = require("express");

const OrdersController = require("../controller/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);
ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/", ordersController.index);
ordersRoutes.patch("/", ordersController.update);
ordersRoutes.delete("/:order_id", ordersController.delete);

module.exports = ordersRoutes;
