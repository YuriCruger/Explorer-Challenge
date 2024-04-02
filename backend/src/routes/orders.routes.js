const { Router } = require("express");

const OrdersController = require("../controller/OrdersController");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/", ordersController.index);
ordersRoutes.patch("/", ordersController.update);
ordersRoutes.delete("/:order_id", ordersController.delete);

module.exports = ordersRoutes;
