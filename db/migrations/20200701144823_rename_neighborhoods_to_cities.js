exports.up = function (knex) {
  return knex.schema
    .renameTable("neighborhoods", "cities")
    .renameTable("neighborhood_details", "city_details")
    .table("city_details", (table) => {
      table.renameColumn("neighborhood_id", "city_id");
    })
    .table("services", (table) => {
      table.renameColumn("neighborhood_id", "city_id");
    });
};

exports.down = function (knex) {
  return knex.schema
    .renameTable("cities", "neighborhoods")
    .renameTable("city_details", "neighborhood_details")
    .table("neighborhood_details", (table) => {
      table.renameColumn("city_id", "neighborhood_id");
    })
    .table("services", (table) => {
      table.renameColumn("city_id", "neighborhood_id");
    });
};
