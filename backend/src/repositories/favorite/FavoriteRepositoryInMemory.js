class FavoriteRepositoryInMemory {
  favorites = [];

  async addFavorite({ user_id, product_id }) {
    const product = {
      id: Math.floor(Math.random() * 1000) + 1,
      user_id: user_id,
      product_id: product_id,
    };

    this.favorites.push(product);

    return product;
  }

  async removeFavorite({ user_id, product_id }) {
    const initialLength = this.favorites.length;

    this.favorites = this.favorites.filter(
      (favorite) =>
        favorite.user_id !== user_id || favorite.product_id !== product_id
    );

    if (this.favorites.length === initialLength) {
      return false;
    }

    return true;
  }
}

module.exports = FavoriteRepositoryInMemory;
