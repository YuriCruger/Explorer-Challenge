const { Router } = require("express");
const UsersController = require("../controller/UserController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/validated", ensureAuthenticated, usersController.index);

module.exports = usersRoutes;
