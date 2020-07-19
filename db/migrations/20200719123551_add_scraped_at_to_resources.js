exports.up = function (knex) {
  return knex.schema.table("resources", (table) => {
    table.datetime("scraped_at");
  });
};

exports.down = function (knex) {
  return knex.schema.table("resources", (table) => {
    table.datetime("scraped_at");
  });
};
