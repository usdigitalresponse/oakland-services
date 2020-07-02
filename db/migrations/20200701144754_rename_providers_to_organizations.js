
exports.up = function(knex) {
  return knex.schema
    .renameTable("providers", "organizations")
    .renameTable("provider_details", "organization_details")
    .table("organization_details", (table) => {
      table.renameColumn("provider_id", "organization_id");
    })
    .table("services", (table) => {
      table.renameColumn("provider_id", "organization_id");
    });
};

exports.down = function(knex) {
   return knex.schema
    .renameTable("organizations", "providers")
    .renameTable("organization_details", "provider_details")
    .table("provider_details", (table) => {
      return table.renameColumn("organization_id", "provider_id");
    })
    .table("services", (table) => {
      return table.renameColumn("organization_id", "provider_id");
    });
};
