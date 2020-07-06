exports.up = function (knex) {
  return knex.schema.table("categories", (table) => {
    table.dropColumn("preferred_name");
  });
};

exports.down = function (knex) {
  return knex.schema.table("categories", (table) => {
    table.string("preferred_name");
  });
};
