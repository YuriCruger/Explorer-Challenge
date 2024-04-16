const AppError = require("../../utils/AppError");

class FavoriteService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async addFavorite({ user_id, product_id }) {
    if (!user_id || !product_id) {
      throw new AppError(
        "O ID do usuário e o ID do produto são obrigatórios.",
        400
      );
    }

    const newFavorite = await this.favoriteRepository.addFavorite({
      user_id,
      product_id,
    });

    return newFavorite;
  }

  async removeFavorite({ user_id, product_id }) {
    if (!user_id || !product_id) {
      throw new AppError(
        "O ID do usuário e o ID do produto são obrigatórios.",
        400
      );
    }

    const deletedProduct = await this.favoriteRepository.removeFavorite({
      user_id,
      product_id,
    });

    if (!deletedProduct) {
      throw new AppError("Produto não encontrado em favoritos.", 404);
    }

    return { removedProduct: deletedProduct };
  }
}

module.exports = FavoriteService;
