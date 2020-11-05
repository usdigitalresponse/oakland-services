const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema
    .createTable("resource_languages", function (table) {
      table.increments("id");
      table.integer("resource_id").unsigned().notNullable();
      table.integer("language_id").unsigned().notNullable();
      table
        .foreign("resource_id")
        .references("resources.id")
        .onDelete("CASCADE");
      table
        .foreign("language_id")
        .references("languages.id")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger("resource_languages")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("resource_languages");
};
