
exports.up = function(knex) {
  return knex.schema
    .alterTable('resources', (table) => {
      table.integer('organization_id').nullable().alter();
      table.integer('city_id').nullable().alter();
    });
};

exports.down = function(knex) {
  return knex.schema
    .alterTable('resources', table => {
      table.integer('organization_id').notNullable().alter();
      table.integer('city_id').notNullable().alter();
    });
};
