const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema
    .createTable("neighborhoods", function (table) {
      table.increments("id");
      table.integer("parent_id").unsigned().nullable();
      table
        .foreign("parent_id")
        .references("neighborhoods.id")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger("neighborhoods")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("neighborhoods");
};
