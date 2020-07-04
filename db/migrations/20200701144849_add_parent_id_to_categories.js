exports.up = function (knex) {
  return knex.schema.table("categories", (table) => {
    table.integer("parent_id").unsigned().nullable();
    table.foreign("parent_id").references("categories.id").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.table("categories", (table) => {
    table.dropColumn("parent_id");
  });
};
