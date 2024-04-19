const { Router } = require("express");
const CartStoreController = require("../controller/CartStoreController");

const cartStoreController = new CartStoreController();
const cartStoreRoutes = Router();

cartStoreRoutes.post("/", cartStoreController.create);
cartStoreRoutes.get("/:userId", cartStoreController.index);
cartStoreRoutes.delete("/:userId/:itemId", cartStoreController.removeCartItem);
cartStoreRoutes.delete("/:userId", cartStoreController.clearCart);

module.exports = cartStoreRoutes;
