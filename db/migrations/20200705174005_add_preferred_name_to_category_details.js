exports.up = function (knex) {
  return knex.schema.table("category_details", (table) => {
    table.string("preferred_name");
  });
};

exports.down = function (knex) {
  return knex.schema.table("category_details", (table) => {
    table.dropColumn("preferred_name");
  });
};
