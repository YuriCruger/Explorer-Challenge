const { Router } = require("express");
const StripeController = require("../controller/StripeController");

const stripeRoutes = Router();

const stripeController = new StripeController();

stripeRoutes.post("/create-checkout-session", stripeController.create);

module.exports = stripeRoutes;
