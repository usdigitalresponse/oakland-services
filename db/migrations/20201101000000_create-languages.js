const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema
    .createTable("languages", function (table) {
      table.increments("id");
      table.text("name");
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger("languages")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("languages");
};
