const AppError = require("../../utils/AppError");

class CartStoreService {
  constructor(cartStoreRepository) {
    this.cartStoreRepository = cartStoreRepository;
  }

  async createCart({ userId, cartItem }) {
    if (!userId || !cartItem) {
      throw new AppError("Id do usuário e o produto são obrigatórios", 400);
    }

    const cartId = await this.cartStoreRepository.createCart(userId);

    let totalQuantity = 0;
    let totalPrice = 0;

    const dish = await this.cartStoreRepository.findDishById(cartItem.dish_id);

    if (dish) {
      totalQuantity = cartItem.quantity;
      totalPrice = dish.price * cartItem.quantity;
    }

    const cartItems = {
      cart_id: cartId,
      dish_id: cartItem.dish_id,
      quantity: cartItem.quantity,
    };

    await this.cartStoreRepository.createCartItems(cartItems);
    await this.cartStoreRepository.updateCartById({
      cartId,
      totalQuantity,
      totalPrice,
    });

    return cartId;
  }

  async getCartItems(userId) {
    const cartOrders = await this.cartStoreRepository.findCartByUserId(userId);

    const cartOrderIds = cartOrders.map((cart) => cart.id);

    const cartOrderItems =
      await this.cartStoreRepository.fetchCartItemsWithDetails(cartOrderIds);

    for (const item of cartOrderItems) {
      const ingredients =
        await this.cartStoreRepository.findIngredientsByDishId(item.dish_id);

      item.ingredients = ingredients;
    }

    return { cartOrders, cartOrderItems };
  }

  async removeCartItem({ userId, itemId }) {
    const cartItem = await this.cartStoreRepository.fetchCartItemForUser({
      userId,
      itemId,
    });

    if (!cartItem) {
      throw new AppError(
        "Item do carrinho não encontrado ou não pertence ao usuário",
        404
      );
    }

    await this.cartStoreRepository.findCartByCartId(cartItem.cart_id);
  }

  async clearCart(userId) {
    await this.cartStoreRepository.deleteCartByUserId(userId);
  }
}

module.exports = CartStoreService;
