const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema
    .createTable("services", function (table) {
      table.increments("id");
      table.integer("provider_id").unsigned().notNullable();
      table.integer("neighborhood_id").unsigned().notNullable();
      table
        .foreign("provider_id")
        .references("providers.id")
        .onDelete("CASCADE");
      table
        .foreign("neighborhood_id")
        .references("neighborhoods.id")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger("services")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("services");
};
