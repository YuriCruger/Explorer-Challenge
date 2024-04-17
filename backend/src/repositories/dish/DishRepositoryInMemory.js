class DishRepositoryInMemory {
  dishes = [];
  ingredients = [];
  favoriteProducts = [];

  async findDishByName(name) {
    return this.dishes.find((dish) => dish.name === name);
  }

  async createDish({ name, category, price, description, filename }) {
    const dish = {
      id: this.dishes.length + 1,
      name,
      category,
      price,
      description,
      image: filename,
    };

    this.dishes.push(dish);

    return dish.id;
  }

  async createIngredients(ingredientsInsert) {
    this.ingredients.push(...ingredientsInsert);
  }

  async showAllDishes() {
    return this.dishes;
  }

  async getFavoriteProductsByUser() {
    return this.favoriteProducts;
  }

  async getIngredients(dish_id) {
    return this.ingredients.filter(
      (ingredient) => ingredient.dish_id === dish_id
    );
  }

  async findDishById(id) {
    return this.dishes.find((dish) => dish.id === id);
  }

  async updateDishById({ id, updatedDish }) {
    const index = this.dishes.findIndex((dish) => dish.id === id);
    if (index !== -1) {
      this.dishes[index] = { ...this.dishes[index], ...updatedDish };
    }
  }

  async deleteIngredientById(id) {
    this.ingredients = this.ingredients.filter(
      (ingredient) => ingredient.dish_id !== id
    );
  }

  async updateIngredient(ingredientsInsert) {
    this.deleteIngredientById(ingredientsInsert[0].dish_id);
    this.ingredients.push(...ingredientsInsert);
  }

  async deleteDishById(id) {
    this.dishes = this.dishes.filter((dish) => dish.id !== id);
  }
}

module.exports = DishRepositoryInMemory;
