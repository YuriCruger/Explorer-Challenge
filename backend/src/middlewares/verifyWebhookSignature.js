const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function verifyWebhookSignature(req, res, next) {
  const sig = req.headers["stripe-signature"];
  console.log("Received signature:", sig);

  try {
    req.webhookEvent = stripe.webhooks.constructEvent(
      req.body,
      sig,
      stripeWebhookSecret
    );
    console.log("Webhook event verified:", req.webhookEvent);
    next();
  } catch (err) {
    console.error(`Webhook Signature Verification Error: ${err.message}`);
    return res
      .status(400)
      .send(`Webhook Signature Verification Error: ${err.message}`);
  }
}

module.exports = verifyWebhookSignature;
