exports.up = async (knex) => {
  await knex.schema.createTable("cart_store", (table) => {
    table.increments("id");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.integer("quantity").unsigned().notNullable().defaultTo(1);
    table.decimal("total_price", 10, 2).notNullable().defaultTo(0);
    table
      .enum("payment_status", ["success", "pending", "failed"], {
        useNative: true,
        enumName: "payment_status",
      })
      .defaultTo("pending");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

  await knex.schema.createTable("cart_items", (table) => {
    table.increments("id");
    table
      .integer("cart_id")
      .unsigned()
      .references("id")
      .inTable("cart_store")
      .onDelete("CASCADE");
    table.integer("dish_id").unsigned().references("id").inTable("dishes");
    table.integer("quantity").defaultTo(1);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("cart_store");
  await knex.schema.dropTable("cart_items");
};
