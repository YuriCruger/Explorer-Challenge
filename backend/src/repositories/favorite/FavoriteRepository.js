const knex = require("../../database/knex");

class FavoriteRepository {
  async addFavorite({ user_id, product_id }) {
    await knex("favorite_products").insert({
      user_id,
      product_id,
    });
  }

  async removeFavorite({ user_id, product_id }) {
    const deletedRows = await knex("favorite_products")
      .where({ user_id, product_id })
      .delete();

    return deletedRows;
  }
}

module.exports = FavoriteRepository;
