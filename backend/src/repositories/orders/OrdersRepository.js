const knex = require("../../database/knex");
const AppError = require("../../utils/AppError");

class OrdersRepository {
  async createOrder({ total_price, user_id }) {
    try {
      const [order_id] = await knex("orders").insert({ user_id, total_price });
      return order_id;
    } catch (error) {
      throw new AppError("Erro ao criar o pedido.", 500);
    }
  }

  async createProductsOrder(productsInsert) {
    try {
      await knex("order_products").insert(productsInsert);
    } catch (error) {
      throw new AppError("Erro ao criar o pedido de produtos.", 500);
    }
  }

  async showOrders() {
    try {
      const orders = await knex("orders").select("*");

      return orders;
    } catch (error) {
      throw new AppError("Erro ao buscar os pedidos.", 500);
    }
  }

  async showProductOrders(order_id) {
    const products = await knex("order_products")
      .where("order_id", order_id)
      .select("*");

    return products;
  }

  async updateOrder({ updated_at, status, order_id }) {
    try {
      await knex("orders")
        .update({ updated_at, status })
        .where({ id: order_id });
    } catch (error) {
      throw new AppError("Erro ao atualizar o pedido.", 500);
    }
  }

  async deleteOrder({ order_id }) {
    try {
      const deletedOrderId = await knex("orders")
        .where({ id: order_id })
        .delete();

      return deletedOrderId;
    } catch (error) {
      throw new AppError("Erro ao deletar o pedido.", 500);
    }
  }
}

module.exports = OrdersRepository;
