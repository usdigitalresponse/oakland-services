exports.up = function (knex) {
  return knex.schema.table("resource_details", (table) => {
    table.string("preferred_name");
    table.string("postal_code");
    table.string("latitude");
    table.string("longitude");
    table.text("application_process", "longtext");
    table.text("eligibility", "longtext");
    table.text("required_documents", "longtext");
    table.text("schedule", "longtext");
  });
};

exports.down = function (knex) {
  return knex.schema.table("resource_details", (table) => {
    table.dropColumn("preferred_name");
    table.dropColumn("postal_code");
    table.dropColumn("latitude");
    table.dropColumn("longitude");
    table.dropColumn("application_process");
    table.dropColumn("required_documents");
    table.dropColumn("eligibility");
    table.dropColumn("schedule");
  });
};
