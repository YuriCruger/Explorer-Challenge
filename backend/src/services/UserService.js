const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Este email já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }

  async getUser(userId) {
    const checkUserExists = await this.userRepository.findById(userId);

    if (!checkUserExists) {
      throw new AppError("Este usuário não existe.");
    }

    return checkUserExists;
  }
}

module.exports = UserService;
