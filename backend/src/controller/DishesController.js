const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body;
    const imageFilename = request.file.filename;

    const checkDishExists = await knex("dishes").where({ name });

    if (checkDishExists.length > 0) {
      throw new AppError("Este prato já existe");
    }

    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(imageFilename);

    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
      image: filename,
    });

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        dish_id,
        name: ingredient,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
  }

  async index(request, response) {
    const dishes = await knex("dishes").select("*");

    const favoriteProductsByUser = await knex("favorite_products")
      .select("user_id", "product_id")
      .groupBy("user_id", "product_id");

    const favoriteProductsMap = {};

    favoriteProductsByUser.forEach(({ user_id, product_id }) => {
      if (!favoriteProductsMap[user_id]) {
        favoriteProductsMap[user_id] = [];
      }
      favoriteProductsMap[user_id].push(product_id);
    });

    const dishesWithIngredientsAndFavorites = await Promise.all(
      dishes.map(async (dish) => {
        const ingredients = await knex("ingredients")
          .where("dish_id", dish.id)
          .select("*");

        const isFavorite = {};

        for (const userId in favoriteProductsMap) {
          isFavorite[userId] = favoriteProductsMap[userId].includes(dish.id);
        }

        return { ...dish, ingredients, isFavorite };
      })
    );

    return response.json(dishesWithIngredientsAndFavorites);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, category, price, description, ingredients } = request.body;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato não encontrado");
    }

    const updatedDish = {
      name,
      category,
      price,
      description,
      updated_at: knex.fn.now(),
    };

    await knex("dishes").where({ id }).update(updatedDish);

    console.log(ingredients);

    const ingredientsArray = ingredients.split(",");

    const ingredientsInsert = ingredientsArray.map((ingredient) => {
      return {
        dish_id: id,
        name: ingredient,
      };
    });

    await knex("ingredients").where("dish_id", id).delete();
    await knex("ingredients").insert(ingredientsInsert);

    return response.status(200).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato não encontrado", 404);
    }

    const diskStorage = new DiskStorage();
    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }

    await knex("dishes").where({ id }).del();

    return response.status(204).send();
  }
}

module.exports = DishesController;
