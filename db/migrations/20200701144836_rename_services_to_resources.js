
exports.up = function(knex) {
  return knex.schema
    .renameTable("services", "resources")
    .renameTable("service_details", "resource_details")
    .table("resource_details", (table) => {
      table.renameColumn("service_id", "resource_id");
    })
    .table("categorizations", (table) => {
      table.renameColumn("service_id", "resource_id");
    });
};

exports.down = function(knex) {
   return knex.schema
    .renameTable("resources", "services")
    .renameTable("resource_details", "service_details")
    .table("service_details", (table) => {
      table.renameColumn("resource_id", "service_id");
    })
    .table("categorizations", (table) => {
      table.renameColumn("resource_id", "service_id");
    });
};
