const FavoriteRepository = require("../repositories/favorite/FavoriteRepository");
const FavoriteService = require("../services/favorite/FavoriteService");

class FavoriteProductsController {
  async create(request, response) {
    const { user_id, product_id } = request.body;

    const favoriteRepository = new FavoriteRepository();
    const favoriteService = new FavoriteService(favoriteRepository);
    await favoriteService.addFavorite({ user_id, product_id });

    return response.status(201).json();
  }

  async delete(request, response) {
    const { user_id, product_id } = request.params;

    const favoriteRepository = new FavoriteRepository();
    const favoriteService = new FavoriteService(favoriteRepository);
    await favoriteService.removeFavorite({ user_id, product_id });

    return response.status(201).json();
  }
}

module.exports = FavoriteProductsController;
