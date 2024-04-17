const DishService = require("../../services/dish/DishService");
const DishRepositoryInMemory = require("../../repositories/dish/DishRepositoryInMemory");
const AppError = require("../../utils/AppError");
const path = require("path");
const fse = require("fs-extra");

describe("DishService", () => {
  let dishService;
  let dishRepository;

  beforeAll(async () => {
    const srcDir = path.resolve(__dirname, "..", "..", "test-images");
    const destDir = path.resolve(srcDir, "..", "..", "tmp");

    await fse.copy(srcDir, destDir);
  });

  beforeEach(async () => {
    dishRepository = new DishRepositoryInMemory();
    dishService = new DishService(dishRepository);

    const destDir = path.resolve(__dirname, "..", "tmp");
    await fse.emptyDir(destDir);
  });

  it("should create a new dish", async () => {
    const dishData = {
      name: "Test Dish",
      category: "Test Category",
      price: 10,
      description: "Test Description",
      ingredients: ["Ingredient1", "Ingredient2"],
      imageFilename: "example1.png",
    };

    await dishService.createDish(dishData);

    expect(dishRepository.dishes.length).toBe(1);
    expect(dishRepository.ingredients.length).toBe(2);
  });

  it("should throw an error if dish already exists", async () => {
    const dishData = {
      name: "Test Dish",
      category: "Test Category",
      price: 10,
      description: "Test Description",
      ingredients: ["Ingredient1", "Ingredient2"],
      imageFilename: "example2.png",
    };

    dishRepository.dishes.push(dishData);

    await expect(dishService.createDish(dishData)).rejects.toEqual(
      new AppError("Este prato já existe")
    );
  });

  it("should update a dish", async () => {
    const dishData = {
      name: "Test Dish",
      category: "Test Category",
      price: 10,
      description: "Test Description",
      ingredients: ["Ingredient1", "Ingredient2"],
      imageFilename: "example3.png",
    };

    const dishId = await dishService.createDish(dishData);

    console.log("Meu id => ", dishId);

    const updatedDishData = {
      name: "Updated Test Dish",
      category: "Updated Test Category",
      price: 15,
      description: "Updated Test Description",
      ingredients: "Updated Ingredient1,Updated Ingredient2",
      id: dishId,
    };

    await dishService.updateDish(updatedDishData);

    const updatedDish = await dishRepository.findDishById(dishId);

    expect(updatedDish.name).toBe("Updated Test Dish");
    expect(updatedDish.price).toBe(15);
    expect(dishRepository.ingredients.length).toBe(2);
  });

  it("should delete a dish", async () => {
    const dishData = {
      name: "Test Dish",
      category: "Test Category",
      price: 10,
      description: "Test Description",
      ingredients: ["Ingredient1", "Ingredient2"],
      imageFilename: "example4.png",
    };

    const dishId = await dishService.createDish(dishData);

    await dishService.deleteDish(dishId);

    const deletedDish = await dishRepository.findDishById(dishId);

    expect(deletedDish).toBeUndefined();
  });
});
