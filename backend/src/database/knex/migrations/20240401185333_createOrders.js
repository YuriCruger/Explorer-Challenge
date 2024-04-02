exports.up = async (knex) => {
  await knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table
      .enum("status", ["delivered", "not_delivered"], {
        useNative: true,
        enumName: "order_status",
      })
      .notNullable()
      .default("not_delivered");
    table.decimal("total_price");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

  await knex.schema.createTable("order_products", (table) => {
    table.increments("id");
    table
      .integer("order_id")
      .unsigned()
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table.text("name");
    table.integer("quantity").defaultTo(1);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("order_products");
  await knex.schema.dropTable("orders");
};
