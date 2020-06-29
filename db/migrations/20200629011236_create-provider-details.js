const { onUpdateTrigger } = require('../../knexfile');

exports.up = function(knex) {
  return knex.schema.createTable('provider_details', function(table) {
    table.increments('id');
    table.string('name');
    table.integer('provider_id').unsigned().notNullable();
    table.foreign('provider_id').references('providers.id').onDelete('CASCADE');
    table.string('lang');
    table.timestamps(true, true);
  }).then(() => knex.raw(onUpdateTrigger('provider_details')));
};

exports.down = function(knex) {
  return knex.schema.dropTable('provider_details');
};
