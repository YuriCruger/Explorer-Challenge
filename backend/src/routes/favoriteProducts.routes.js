const { Router } = require("express");

const FavoriteProductsController = require("../controller/FavoriteProductsController");

const favoriteProductsController = new FavoriteProductsController();

const favoriteProductsRoutes = Router();

favoriteProductsRoutes.post("/", favoriteProductsController.create);
favoriteProductsRoutes.delete(
  "/:userId/:productId",
  favoriteProductsController.delete
);

module.exports = favoriteProductsRoutes;
