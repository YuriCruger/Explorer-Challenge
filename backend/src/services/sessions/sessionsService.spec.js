const SessionsService = require("./SessionsService");
const SessionsRepositoryInMemory = require("../../repositories/sessions/SessionsRepositoryInMemory");
const { hash } = require("bcryptjs");
const AppError = require("../../utils/AppError");

describe("SessionsService", () => {
  let sessionsRepositoryInMemory = null;
  let sessionsService = null;

  beforeEach(() => {
    sessionsRepositoryInMemory = new SessionsRepositoryInMemory();
    sessionsService = new SessionsService(sessionsRepositoryInMemory);
  });

  it("should authenticate a user with valid credentials", async () => {
    const hashedPassword = await hash("password123", 10);
    const user = {
      email: "test@example.com",
      password: hashedPassword,
    };

    await sessionsRepositoryInMemory.createUser(user);

    const { user: authenticatedUser } = await sessionsService.execute({
      email: "test@example.com",
      password: "password123",
    });

    expect(authenticatedUser).toHaveProperty("id");
    expect(authenticatedUser.email).toBe("test@example.com");
    expect(authenticatedUser).not.toHaveProperty("password");
  });

  it("should not authenticate a user with invalid credentials", async () => {
    const hashedPassword = await hash("password123", 10);
    const user = {
      email: "test@example.com",
      password: hashedPassword,
    };

    await sessionsRepositoryInMemory.createUser(user);

    await expect(
      sessionsService.execute({
        email: "test@example.com",
        password: "wrongpassword",
      })
    ).rejects.toEqual(new AppError("Email e/ou senha incorreta.", 401));
  });
});
