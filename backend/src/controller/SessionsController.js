const SessionsRepository = require("../repositories/sessions/SessionsRepository");
const SessionsService = require("../services/sessions/SessionsService");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const sessionsRepository = new SessionsRepository();
    const sessionsService = new SessionsService(sessionsRepository);

    const { user, token } = await sessionsService.execute({ email, password });
    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    delete user.password;

    response.status(201).json({ user });
  }
}

module.exports = SessionsController;
