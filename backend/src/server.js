require("express-async-errors");

const cors = require("cors");
const express = require("express");
const AppError = require("./utils/AppError");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const path = require("path");
const uploadConfig = require("./configs/upload");
const StripeController = require("./controller/StripeController");
const stripeController = new StripeController();
const verifyWebhookSignature = require("./middlewares/verifyWebhookSignature");

const app = express();
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  verifyWebhookSignature,
  stripeController.handleWebhook
);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173/",
      "https://explorer-challenge.vercel.app",
    ],
    credentials: true,
  })
);
app.use("/uploads", express.static(path.resolve(uploadConfig.UPLOADS_FOLDER)));

app.use(routes);

app.use((err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
