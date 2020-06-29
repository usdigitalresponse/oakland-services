const { onUpdateTrigger } = require('../../knexfile');

exports.up = function(knex) {
  return knex.schema.createTable('categorizations', function(table) {
    table.increments('id');
    table.integer('service_id').unsigned().notNullable();
    table.integer('category_id').unsigned().notNullable();
    table.foreign('service_id').references('services.id').onDelete('CASCADE');
    table.foreign('category_id').references('categories.id').onDelete('CASCADE');
    table.timestamps(true, true);
  }).then(() => knex.raw(onUpdateTrigger('categorizations')));
};

exports.down = function(knex) {
  return knex.schema.dropTable('categorizations');
};
