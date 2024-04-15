const UserRepository = require("../repositories/UserRepository");
const UserService = require("../services/UserService");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    await userService.register({ name, email, password });

    return response.status(201).json();
  }

  async index(request, response) {
    const { user } = request;

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    await userService.getUser({ user });

    return response.status(200).json();
  }
}

module.exports = UsersController;
