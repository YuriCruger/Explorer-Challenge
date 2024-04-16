class SessionsRepositoryInMemory {
  users = [];

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  async createUser({ email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      email,
      password,
    };

    this.users.push(user);

    return user;
  }
}

module.exports = SessionsRepositoryInMemory;
