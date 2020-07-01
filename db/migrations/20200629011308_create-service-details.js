const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema
    .createTable("service_details", function (table) {
      table.increments("id");
      table.integer("service_id").unsigned().notNullable();
      table.foreign("service_id").references("services.id").onDelete("CASCADE");
      table.string("address");
      table.string("website");
      table.string("phone_number");
      table.string("email");
      table.text("description", "longtext");
      table.text("program_information", "longtext");
      table.string("service_hours");
      table.string("lang");
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger("service_details")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("service_details");
};
