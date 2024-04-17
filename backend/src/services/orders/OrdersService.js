const AppError = require("../../utils/AppError");

class OrdersService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder({ total_price, products, user_id }) {
    if (!total_price || !products || !user_id) {
      throw new AppError(
        "Preço total, produtos e ID do usuário são obrigatórios.",
        400
      );
    }

    const order_id = await this.orderRepository.createOrder({
      total_price,
      user_id,
    });

    const productsInsert = products.map((product) => {
      if (!product.name || !product.quantity) {
        throw new AppError(
          "Nome do produto e quantidade são obrigatórios.",
          400
        );
      }

      return {
        order_id,
        name: product.name,
        quantity: product.quantity,
      };
    });

    await this.orderRepository.createProductsOrder(productsInsert);

    return order_id;
  }

  async showOrders() {
    try {
      const orders = await this.orderRepository.showOrders();

      const ordersWithProducts = await Promise.all(
        orders.map(async (order) => {
          const products = await this.orderRepository.showProductOrders(
            order.id
          );
          return { ...order, products };
        })
      );

      return ordersWithProducts;
    } catch (error) {
      throw new AppError("Erro ao buscar os pedidos.", 500);
    }
  }

  async updateOrder({ updated_at, status, order_id }) {
    if (!updated_at || !status || !order_id) {
      throw new AppError("Dados incompletos para atualização do pedido.", 400);
    }

    const updatedOrder = await this.orderRepository.updateOrder({
      updated_at,
      status,
      orderId: order_id,
    });

    return updatedOrder;
  }

  async deleteOrder({ order_id }) {
    const deletedOrderId = await this.orderRepository.deleteOrder({ order_id });

    if (!deletedOrderId) {
      throw new AppError("Pedido não encontrado.", 404);
    }

    return { deletedOrderId };
  }
}

module.exports = OrdersService;
