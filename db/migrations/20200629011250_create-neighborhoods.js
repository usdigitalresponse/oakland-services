const { onUpdateTrigger } = require('../../knexfile');

exports.up = function(knex) {
  return knex.schema.createTable('neighborhoods', function(table) {
    table.increments('id');
    table.timestamps(true, true);
  }).then(() => knex.raw(onUpdateTrigger('neighborhoods')));
};

exports.down = function(knex) {
  return knex.schema.dropTable('neighborhoods');
};
