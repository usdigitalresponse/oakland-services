// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres@localhost/oakland_services_dev",
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/dev",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "pg",
    connection: "postgres://postgres@localhost/oakland_services_test",
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/test",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/production",
    },
    useNullAsDefault: true,
  },

  onUpdateTrigger: (table) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `,
};
