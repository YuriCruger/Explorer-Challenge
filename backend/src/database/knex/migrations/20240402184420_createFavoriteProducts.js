exports.up = async (knex) => {
  await knex.schema.createTable("favorite_products", (table) => {
    table.increments("id");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.integer("product_id").unsigned().references("id").inTable("dishes");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("favorite_products");
};
