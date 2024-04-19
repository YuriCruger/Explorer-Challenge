const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const CartStoreService = require("../services/cartStore/CartStoreService");
const CartStoreRepository = require("../repositories/cartStore/CartStoreRepository");

class CartStoreController {
  async create(request, response) {
    const { userId, cartItem } = request.body;

    const cartStoreRepository = new CartStoreRepository();
    const cartStoreService = new CartStoreService(cartStoreRepository);

    try {
      const cartId = await cartStoreService.createCart({ userId, cartItem });
      return response.status(201).json({ cartId });
    } catch (error) {
      console.log(error);
      throw new AppError("Erro ao criar pedido no carrinho.", 500);
    }
  }

  async index(request, response) {
    const { userId } = request.params;
    const cartStoreRepository = new CartStoreRepository();
    const cartStoreService = new CartStoreService(cartStoreRepository);
    try {
      const { cartOrders, cartOrderItems } =
        await cartStoreService.getCartItems(userId);
      return response.json({ cartOrders, cartOrderItems });
    } catch (error) {
      console.log(error);
      return response.json({ cartOrders: [], cartOrderItems: [] });
    }
  }

  async removeCartItem(request, response) {
    const { userId, itemId } = request.params;
    const cartStoreRepository = new CartStoreRepository();
    const cartStoreService = new CartStoreService(cartStoreRepository);
    try {
      await cartStoreService.removeCartItem({ userId, itemId });

      return response.status(200).json();
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }
      throw new AppError("Erro ao excluir item do carrinho", 500);
    }
  }

  async clearCart(request, response) {
    const { userId } = request.params;

    const cartStoreRepository = new CartStoreRepository();
    const cartStoreService = new CartStoreService(cartStoreRepository);
    try {
      await cartStoreService.clearCart(userId);

      return response.status(200).json();
    } catch (error) {
      console.log(error);
      throw new AppError("Erro ao limpar carrinho", 500);
    }
  }
}

module.exports = CartStoreController;
