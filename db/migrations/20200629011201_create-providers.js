const { onUpdateTrigger } = require('../../knexfile');

exports.up = function(knex) {
  return knex.schema.createTable('providers', function(table) {
    table.increments('id');
    table.timestamps(true, true);
  }).then(() => knex.raw(onUpdateTrigger('providers')));
};

exports.down = function(knex) {
  return knex.schema.dropTable('providers');
};
