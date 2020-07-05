exports.up = function (knex) {
  return knex.schema.alterTable("resources", (table) => {
    table.integer("organization_id").nullable().alter();
    table.integer("city_id").nullable().alter();
  });
};

// Difficult to add nullable constraint with existing data
exports.down = function (knex) {};
