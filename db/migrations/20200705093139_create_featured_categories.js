const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema
    .createTable("featured_categories", function (table) {
      table.increments("id");
      table.integer("category_id").unsigned().nullable();
      table
        .foreign("category_id")
        .references("categories.id")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger("featured_categories")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("featured_categories");
};
