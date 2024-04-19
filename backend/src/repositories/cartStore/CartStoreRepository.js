const knex = require("../../database/knex");

class CartStoreRepository {
  async createCart(userId) {
    const [cartId] = await knex("cart_store").insert({
      user_id: userId,
      payment_status: "pending",
    });

    return cartId;
  }

  async findDishById(dish_id) {
    const dish = await knex("dishes").where("id", dish_id).first();

    return dish;
  }

  async createCartItems(cartItems) {
    await knex("cart_items").insert(cartItems);
  }

  async updateCartById({ cartId, totalQuantity, totalPrice }) {
    await knex("cart_store").where("id", cartId).update({
      quantity: totalQuantity,
      total_price: totalPrice,
    });
  }

  async findCartByUserId(userId) {
    const cartOrders = await knex("cart_store").where("user_id", userId);

    return cartOrders;
  }

  async removeCartItem(cart_id) {
    await knex("cart_store").where("id", cart_id).del();
  }

  async fetchCartItemsWithDetails(cartOrderIds) {
    const cartOrderItems = await knex("cart_items")
      .whereIn("cart_id", cartOrderIds)
      .join("dishes", "cart_items.dish_id", "=", "dishes.id")
      .select("cart_items.*", "dishes.name", "dishes.price", "dishes.image");

    return cartOrderItems;
  }

  async findIngredientsByDishId(dish_id) {
    const ingredients = await knex("ingredients")
      .where("dish_id", dish_id)
      .select("name");

    return ingredients;
  }

  async fetchCartItemForUser({ userId, itemId }) {
    const cartItem = await knex("cart_items")
      .join("cart_store", "cart_items.cart_id", "=", "cart_store.id")
      .where({
        "cart_store.user_id": userId,
        "cart_items.id": itemId,
      })
      .first();

    return cartItem;
  }

  async deleteCartByUserId(userId) {
    await knex("cart_store").where("user_id", userId).del();
  }
}

module.exports = CartStoreRepository;
