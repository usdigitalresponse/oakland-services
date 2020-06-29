const ON_UPDATE_TIMESTAMP_FUNCTION = `
  CREATE OR REPLACE FUNCTION on_update_timestamp()
  RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
$$ language 'plpgsql';
`
exports.up = function(knex) {
  return knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);
};

exports.down = function(knex) {
  return knex.raw('DROP FUNCTION on_update_timestamp');
};
