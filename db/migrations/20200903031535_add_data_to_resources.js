exports.up = function (knex) {
  return knex.schema.table("resources", (table) => {
    table.jsonb("data");
  });
};

exports.down = function (knex) {
  return knex.schema.table("resources", (table) => {
    table.jsonb("data");
  });
};
