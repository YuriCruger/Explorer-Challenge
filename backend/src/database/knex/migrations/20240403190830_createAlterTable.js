exports.up = function (knex) {
  return knex.schema
    .alterTable("ingredients", function (table) {
      table.dropForeign("dish_id");
    })
    .then(() => {
      return knex.schema.alterTable("dishes", function (table) {
        table.decimal("price").alter();
      });
    })
    .then(() => {
      return knex.schema.alterTable("ingredients", function (table) {
        table
          .integer("dish_id")
          .references("id")
          .inTable("dishes")
          .onDelete("CASCADE")
          .alter();
      });
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable("ingredients", function (table) {
      table.dropForeign("dish_id");
    })
    .then(() => {
      return knex.schema.alterTable("dishes", function (table) {
        table.integer("price").alter();
      });
    })
    .then(() => {
      return knex.schema.alterTable("ingredients", function (table) {
        table
          .integer("dish_id")
          .references("id")
          .inTable("dishes")
          .onDelete("CASCADE")
          .alter();
      });
    });
};
