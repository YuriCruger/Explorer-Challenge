const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const dishesRouter = require("./dishes.routes");
const ordersRouter = require("./orders.routes");
const favoriteProductsRouter = require("./favoriteProducts.routes");
const stripeRouter = require("./stripe");
const cartStoreRouter = require("./cartStore.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/dishes", dishesRouter);
routes.use("/orders", ordersRouter);
routes.use("/favorite-products", favoriteProductsRouter);
routes.use("/stripe", stripeRouter);
routes.use("/cart-store", cartStoreRouter);

module.exports = routes;
