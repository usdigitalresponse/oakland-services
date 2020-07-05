exports.up = function (knex) {
  return knex.schema.table("categories", (table) => {
    table.integer("neighborhood_id").unsigned().nullable();
    table
      .foreign("neighborhood_id")
      .references("neighborhoods.id")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.table("resources", (table) => {
    table.dropColumn("neighborhood_id");
  });
};
