const knex = require("../database/knex");

class FavoriteProductsController {
  async create(request, response) {
    const { user_id, product_id } = request.body;

    await knex("favorite_products").insert({ user_id, product_id });

    return response.status(201).json();
  }

  async delete(request, response) {
    const { userId, productId } = request.params;

    await knex("favorite_products")
      .where({ user_id: userId, product_id: productId })
      .delete();

    return response.status(201).json();
  }
}

module.exports = FavoriteProductsController;
