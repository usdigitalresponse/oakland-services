const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema
    .createTable("category_details", function (table) {
      table.increments("id");
      table.integer("category_id").unsigned().notNullable();
      table
        .foreign("category_id")
        .references("categories.id")
        .onDelete("CASCADE");
      table.string("name");
      table.string("lang");
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger("category_details")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("category_details");
};
