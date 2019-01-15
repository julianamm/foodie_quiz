// Update with your config settings.

module.exports = {
  development: {
    client: "pg", 
    connection: {
      database: "quizzr" 
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    }
  }
};