const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema
    .createTable("neighborhood_details", function (table) {
      table.increments("id");
      table.integer("neighborhood_id").unsigned().notNullable();
      table
        .foreign("neighborhood_id")
        .references("neighborhoods.id")
        .onDelete("CASCADE");
      table.string("name");
      table.string("lang");
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger("neighborhood_details")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("neighborhood_details");
};
