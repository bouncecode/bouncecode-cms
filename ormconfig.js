const { DATABASE } = require("./envconfig");

module.exports = {
  ...DATABASE,
  synchronize: true,
  entities: ["server/models/**/*.entity.{js,ts}"],
  // migrations: ["server/migrations/*.{js,ts}"],
  // subscribers: ["server/subscribers/**/*.{js,ts}"],
  // seeds: ["server/migrations/seeds/**/*.{js,ts}"],
  // factories: ["server/migrations/factories/**/*.{js,ts}"],
};
