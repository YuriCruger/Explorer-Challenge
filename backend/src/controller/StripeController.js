const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");

class StripeController {
  async create(request, response) {
    const { cartOrders, userId } = request.body;

    const lineItems = cartOrders.map((order) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: order.name,
        },
        unit_amount: Math.round(order.price * 100),
      },
      quantity: order.quantity,
    }));

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        payment_intent_data: {
          metadata: {
            userId: userId,
            products: JSON.stringify(cartOrders),
          },
        },
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
      });

      response.json({ sessionId: session.id });
    } catch (error) {
      console.error("Erro ao criar sessão de checkout:", error);
      response.status(500).json({ error: "Erro ao criar sessão de checkout" });
    }
  }

  async handleWebhook(request, response) {
    const sig = request.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const session = event.data.object;

      console.log(session.metadata.products);

      const products = JSON.parse(session.metadata.products);
      const total_price = session.amount;
      const user_id = session.metadata.userId;

      await axios
        // .post("https://explorer-challenge.onrender.com/orders", {
        .post("http://localhost:3333/orders", {
          total_price,
          products,
          user_id,
        })
        .catch((error) => console.error(`Erro: ${error.message}`));

      await axios
        // .delete(`https://explorer-challenge.onrender.com/cart-store/${user_id}`)
        .delete(`http://localhost:3333/cart-store/${user_id}`)
        .catch((error) => console.error(`Erro: ${error}`));
    }

    response.json({ received: true });
  }
}

module.exports = StripeController;
