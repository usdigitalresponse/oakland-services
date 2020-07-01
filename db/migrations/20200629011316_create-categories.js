const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema
    .createTable("categories", function (table) {
      table.increments("id");
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger("categories")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("categories");
};
