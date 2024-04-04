const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controller/DishesController");
const DishImageController = require("../controller/DishImageController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishesController = new DishesController();
const dishImageController = new DishImageController();

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

dishesRoutes.post("/", upload.single("image"), dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.patch("/:id", dishesController.update);
dishesRoutes.patch(
  "/image/:id",
  upload.single("image"),
  dishImageController.update
);
dishesRoutes.delete("/:id", dishesController.delete);

module.exports = dishesRoutes;
