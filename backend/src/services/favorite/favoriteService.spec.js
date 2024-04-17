const FavoriteService = require("../favorite/FavoriteService");
const FavoriteRepositoryInMemory = require("../../repositories/favorite/FavoriteRepositoryInMemory");
const AppError = require("../../utils/AppError");

describe("FavoriteService", () => {
  let favoriteRepositoryInMemory = null;
  let favoriteService = null;

  beforeEach(() => {
    favoriteRepositoryInMemory = new FavoriteRepositoryInMemory();
    favoriteService = new FavoriteService(favoriteRepositoryInMemory);
  });

  it("should add a product to favorites", async () => {
    const product = {
      user_id: "1",
      product_id: "1",
    };

    const result = await favoriteService.addFavorite(product);

    expect(result).toHaveProperty("id");
    expect(result.user_id).toBe(product.user_id);
    expect(result.product_id).toBe(product.product_id);
  });

  it("should remove a product to favorites", async () => {
    const product = {
      user_id: "1",
      product_id: "1",
    };

    await favoriteService.addFavorite(product);

    const result = await favoriteService.removeFavorite(product);

    expect(result).toHaveProperty("removedProduct", true);
  });

  it("should throw an error when trying to add a product with invalid IDs", async () => {
    const product = {
      user_id: "",
      product_id: "",
    };

    await expect(favoriteService.addFavorite(product)).rejects.toEqual(
      new AppError("O ID do usuário e o ID do produto são obrigatórios.", 400)
    );
  });

  it("should throw an error when trying to remove a product with invalid IDs", async () => {
    const product = {
      user_id: "",
      product_id: "",
    };

    await expect(favoriteService.removeFavorite(product)).rejects.toEqual(
      new AppError("O ID do usuário e o ID do produto são obrigatórios.", 400)
    );
  });

  it("should throw an error when trying to remove a product that doesn't exist in favorites", async () => {
    const product = {
      user_id: "1",
      product_id: "2",
    };

    await expect(favoriteService.removeFavorite(product)).rejects.toEqual(
      new AppError("Produto não encontrado em favoritos.", 404)
    );
  });
});
