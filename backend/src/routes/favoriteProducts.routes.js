const { Router } = require("express");

const FavoriteProductsController = require("../controller/FavoriteProductsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const favoriteProductsController = new FavoriteProductsController();

const favoriteProductsRoutes = Router();

favoriteProductsRoutes.use(ensureAuthenticated);
favoriteProductsRoutes.post("/", favoriteProductsController.create);
favoriteProductsRoutes.delete(
  "/:user_id/:product_id",
  favoriteProductsController.delete
);

module.exports = favoriteProductsRoutes;
