
exports.up = function(knex) {
  return knex.schema.table("resource_details", (table) => {
    table.string("name");
  }); 
};

exports.down = function(knex) {
  return knex.schema.table("resource_details", (table) => {
    table.dropColumn("name");
  }); 
};
