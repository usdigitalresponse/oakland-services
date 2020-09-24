exports.up = function (knex) {
  return knex.schema.table("categories", (table) => {
    table.integer("external_id");
  });
};

exports.down = function (knex) {
  return knex.schema.table("categories", (table) => {
    table.integer("external_id");
  });
};
