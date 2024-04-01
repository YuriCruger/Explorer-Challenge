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
}

module.exports = OrdersController;
