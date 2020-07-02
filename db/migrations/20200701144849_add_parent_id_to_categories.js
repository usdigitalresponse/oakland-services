
exports.up = function(knex) {
  return knex.table("categories", (table) => {
    table
      .foreign("parent_id")
      .references("categories.id")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.table("categories", (table) => {
    table.dropColumn("parent_id");
  });
};
