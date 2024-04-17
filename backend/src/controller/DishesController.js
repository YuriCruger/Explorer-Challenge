const DishRepository = require("../repositories/dish/DishRepository");
const DishService = require("../services/dish/DishService");

class DishesController {
  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body;
    const imageFilename = request.file.filename;

    const dishRepository = new DishRepository();
    const dishService = new DishService(dishRepository);
    await dishService.createDish({
      name,
      category,
      price,
      description,
      ingredients,
      imageFilename,
    });

    return response.status(201).json();
  }

  async index(request, response) {
    const dishRepository = new DishRepository();
    const dishService = new DishService(dishRepository);
    const dishesWithIngredientsAndFavorites = await dishService.getDishes();

    return response.json(dishesWithIngredientsAndFavorites);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, category, price, description, ingredients } = request.body;

    const dishRepository = new DishRepository();
    const dishService = new DishService(dishRepository);
    await dishService.updateDish({
      name,
      category,
      price,
      description,
      ingredients,
      id,
    });

    return response.status(200).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const dishRepository = new DishRepository();
    const dishService = new DishService(dishRepository);
    await dishService.deleteDish(id);

    return response.status(204).send();
  }
}

module.exports = DishesController;
