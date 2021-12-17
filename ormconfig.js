let ormconfig = {};

if(process.env.PRODUCTION) ormconfig = {
  type: "sqlite",
  database: "./dist/database/gpao.sqlite",
  entities: ["./dist/models/*.js"],
  logging: [ "error"],
  logger: "file",
  migrations: ["./dist/migrations/*.js"],
  cli: {
    migrationsDir: "./dist/migrations"
  }
}
else ormconfig = {
  type: "sqlite",
  database: "./src/database/gpao.sqlite",
  entities: ["./src/models/*.{ts,js}"],
  logging: ["query", "error"],
  logger: "file",
  migrations: ["./src/migrations/*.{ts,js}"],
  cli: {
    migrationsDir: "./src/migrations"
  }
}

module.exports = ormconfig;