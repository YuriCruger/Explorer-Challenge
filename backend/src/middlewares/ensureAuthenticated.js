const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { verify } = require("jsonwebtoken");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.cookie;

  if (!authHeader) {
    throw new AppError("JWT token não informado", 401);
  }

  const tokenCookie = authHeader
    .split(";")
    .find((cookie) => cookie.trim().startsWith("token="));

  if (!tokenCookie) {
    throw new AppError("JWT token não encontrado no cookie", 401);
  }

  const token = tokenCookie.split("=")[1];

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      role,
    };

    return next();
  } catch (error) {
    console.error("Erro ao verificar o token:", error);
    throw new AppError("Token JWT inválido", 401);
  }
}

module.exports = ensureAuthenticated;
