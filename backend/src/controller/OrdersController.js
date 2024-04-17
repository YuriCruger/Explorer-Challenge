const knex = require("../database/knex");
const OrdersRepository = require("../repositories/orders/OrdersRepository");
const OrdersService = require("../services/orders/OrdersService");

class OrdersController {
  async create(request, response) {
    const { total_price, products, user_id } = request.body;

    const ordersRepository = new OrdersRepository();
    const ordersService = new OrdersService(ordersRepository);

    await ordersService.createOrder({ total_price, products, user_id });

    return response.status(201).json();
  }

  async index(request, response) {
    const ordersRepository = new OrdersRepository();
    const ordersService = new OrdersService(ordersRepository);

    const orders = await ordersService.showOrders();

    return response.json(orders);
  }

  async update(request, response) {
    const { updated_at, status, order_id } = request.body;

    const ordersRepository = new OrdersRepository();
    const ordersService = new OrdersService(ordersRepository);

    await ordersService.updateOrder({ updated_at, status, order_id });

    return response.status(201).json();
  }

  async delete(request, response) {
    const { order_id } = request.params;

    const ordersRepository = new OrdersRepository();
    const ordersService = new OrdersService(ordersRepository);

    await ordersService.deleteOrder({ order_id });

    return response.status(201).json();
  }
}

module.exports = OrdersController;
