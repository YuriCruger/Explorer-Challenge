const knex = require("../database/knex");

class OrdersController {
  async create(request, response) {
    const { total_price, products, user_id } = request.body;

    const [order_id] = await knex("orders").insert({ user_id, total_price });

    const productsInsert = products.map((product) => {
      return {
        order_id,
        name: product.name,
        quantity: product.quantity,
      };
    });

    await knex("order_products").insert(productsInsert);

    return response.status(201).json();
  }

  async index(request, response) {
    const orders = await knex("orders").select("*");

    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const products = await knex("order_products")
          .where("order_id", order.id)
          .select("*");
        return { ...order, products };
      })
    );

    return response.json(ordersWithProducts);
  }

  async update(request, response) {
    const { updated_at, status, order_id } = request.body;

    await knex("orders").update({ updated_at, status }).where({ id: order_id });

    return response.status(201).json();
  }

  async delete(request, response) {
    const { order_id } = request.params;

    await knex("orders").where({ id: order_id }).delete();

    return response.status(201).json();
  }
}

module.exports = OrdersController;
