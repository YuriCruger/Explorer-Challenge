const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controller/DishesController");
const DishImageController = require("../controller/DishImageController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishesController = new DishesController();
const dishImageController = new DishImageController();

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);
dishesRoutes.post(
  "/",
  upload.single("image"),
  verifyUserAuthorization("admin"),
  dishesController.create
);
dishesRoutes.get("/", verifyUserAuthorization("admin"), dishesController.index);
dishesRoutes.patch(
  "/:id",
  verifyUserAuthorization("admin"),
  dishesController.update
);
dishesRoutes.patch(
  "/image/:id",
  upload.single("image"),
  verifyUserAuthorization("admin"),
  dishImageController.update
);
dishesRoutes.delete(
  "/:id",
  verifyUserAuthorization("admin"),
  dishesController.delete
);

module.exports = dishesRoutes;
