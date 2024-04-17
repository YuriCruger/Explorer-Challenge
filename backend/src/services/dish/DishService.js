const DiskStorage = require("../../providers/DiskStorage");
const AppError = require("../../utils/AppError");
const knex = require("../../database/knex");

class DishService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async createDish({
    name,
    category,
    price,
    description,
    ingredients,
    imageFilename,
  }) {
    const checkDishExists = await this.dishRepository.findDishByName(name);

    if (checkDishExists) {
      throw new AppError("Este prato já existe");
    }

    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(imageFilename);

    const dish_id = await this.dishRepository.createDish({
      name,
      category,
      price,
      description,
      filename,
    });

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        dish_id,
        name: ingredient,
      };
    });

    await this.dishRepository.createIngredients(ingredientsInsert);

    return dish_id;
  }

  async getDishes() {
    const dishes = await this.dishRepository.showAllDishes();

    const favoriteProductsByUser =
      await this.dishRepository.getFavoriteProductsByUser();

    const favoriteProductsMap = {};

    favoriteProductsByUser.forEach(({ user_id, product_id }) => {
      if (!favoriteProductsMap[user_id]) {
        favoriteProductsMap[user_id] = [];
      }
      favoriteProductsMap[user_id].push(product_id);
    });

    const dishesWithIngredientsAndFavorites = await Promise.all(
      dishes.map(async (dish) => {
        const ingredients = await this.dishRepository.getIngredients(dish.id);

        const isFavorite = {};

        for (const userId in favoriteProductsMap) {
          isFavorite[userId] = favoriteProductsMap[userId].includes(dish.id);
        }

        return { ...dish, ingredients, isFavorite };
      })
    );

    return dishesWithIngredientsAndFavorites;
  }

  async updateDish({ name, category, price, description, ingredients, id }) {
    const dish = await this.dishRepository.findDishById(id);

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

    await this.dishRepository.updateDishById({ id, updatedDish });

    const ingredientsArray = ingredients.split(",");

    const ingredientsInsert = ingredientsArray.map((ingredient) => {
      return {
        dish_id: id,
        name: ingredient,
      };
    });

    await this.dishRepository.deleteIngredientById(id);
    await this.dishRepository.updateIngredient(ingredientsInsert);
  }

  async deleteDish(id) {
    const dish = await this.dishRepository.findDishById(id);

    if (!dish) {
      throw new AppError("Prato não encontrado", 404);
    }

    const diskStorage = new DiskStorage();
    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }

    await this.dishRepository.deleteDishById(id);
  }
}

module.exports = DishService;
