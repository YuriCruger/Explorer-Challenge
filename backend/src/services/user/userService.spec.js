const UserService = require("./UserService");
const UserRepositoryInMemory = require("../../repositories/user/UserRepositoryInMemory");
const AppError = require("../../utils/AppError");

describe("UserService", () => {
  let userRepositoryInMemory = null;
  let userService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userService = new UserService(userRepositoryInMemory);
  });

  it("user should be create", async () => {
    const user = {
      name: "administrador",
      email: "admin@admin.com",
      password: "123456",
    };

    const userCreated = await userService.register(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("user not should be create with exist email", async () => {
    const user1 = {
      name: "User test 1",
      email: "user@teste.com",
      password: "123456",
    };

    const user2 = {
      name: "User test 2",
      email: "user@teste.com",
      password: "123456",
    };

    await userService.register(user1);
    await expect(userService.register(user2)).rejects.toEqual(
      new AppError("Este email já está em uso.")
    );
  });

  it("find user by id", async () => {
    const user = {
      name: "User test",
      email: "user@test.com",
      password: "123456",
    };

    const userCreated = await userService.register(user);

    const foundUser = await userService.getUser(userCreated.id);

    expect(foundUser).toEqual(userCreated);
  });
});
