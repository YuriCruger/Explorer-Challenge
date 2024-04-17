const AppError = require("../../utils/AppError");

class OrdersRepositoryInMemory {
  orders = [];
  orderProducts = [];

  async createOrder({ total_price, user_id }) {
    const order = { id: this.orders.length + 1, total_price, user_id };
    this.orders.push(order);
    return order.id;
  }

  async createProductsOrder(productsInsert) {
    productsInsert.forEach((product) => {
      const orderProduct = {
        order_id: product.order_id,
        name: product.name,
        quantity: product.quantity,
      };
      this.orderProducts.push(orderProduct);
    });
  }

  async showOrders() {
    return this.orders;
  }

  async showProductOrders(order_id) {
    return this.orderProducts.filter(
      (product) => product.order_id === order_id
    );
  }

  async updateOrder({ updated_at, status, orderId }) {
    const orderToUpdate = this.orders.find((order) => order.id === orderId);

    if (!orderToUpdate) {
      throw new AppError("Pedido não encontrado.", 404);
    }

    orderToUpdate.status = status;
    orderToUpdate.updated_at = updated_at;

    return orderToUpdate;
  }

  async deleteOrder({ order_id }) {
    const orderIndex = this.orders.findIndex((order) => order.id === order_id);

    if (orderIndex === -1) {
      throw new AppError("Pedido não encontrado.", 404);
    }

    const deletedOrder = this.orders.splice(orderIndex, 1)[0];

    return deletedOrder.id;
  }
}

module.exports = OrdersRepositoryInMemory;
