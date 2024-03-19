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

    const ingredientsArray = ingredients.split(",");

    const ingredientsInsert = ingredientsArray.map((ingredient) => {
      return {
        dish_id,
        name: ingredient,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
    // return response.status(201).json({
    //   id: dish_id,
    //   name,
    //   category,
    //   price,
    //   description,
    //   image: filename,
    //   ingredients: ingredientsInsert,
    // });
  }

  async index(request, response) {
    const dishes = await knex("dishes").select("*");

    return response.json(dishes);
  }
}

module.exports = DishesController;
