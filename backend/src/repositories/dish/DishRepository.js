const knex = require("../../database/knex");

class DishRepository {
  async findDishByName(name) {
    const checkDishExists = await knex("dishes").where({ name });

    return checkDishExists;
  }

  async createDish({ name, category, price, description, filename }) {
    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
      image: filename,
    });

    return dish_id;
  }

  async createIngredients(ingredientsInsert) {
    await knex("ingredients").insert(ingredientsInsert);
  }

  async showAllDishes() {
    const dishes = await knex("dishes").select("*");

    return dishes;
  }

  async getFavoriteProductsByUser() {
    const favoriteProductsByUser = await knex("favorite_products")
      .select("user_id", "product_id")
      .groupBy("user_id", "product_id");

    return favoriteProductsByUser;
  }

  async getIngredients(dish_id) {
    const ingredients = await knex("ingredients")
      .where("dish_id", dish_id)
      .select("*");

    return ingredients;
  }

  async findDishById(id) {
    const dish = await knex("dishes").where({ id }).first();

    return dish;
  }

  async updateDishById({ id, updatedDish }) {
    await knex("dishes").where({ id }).update(updatedDish);
  }

  async deleteIngredientById(id) {
    await knex("ingredients").where("dish_id", id).delete();
  }

  async updateIngredient(ingredientsInsert) {
    await knex("ingredients").insert(ingredientsInsert);
  }

  async deleteDishById(id) {
    await knex("dishes").where({ id }).del();
  }
}

module.exports = DishRepository;
