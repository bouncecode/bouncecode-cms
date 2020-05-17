const { DATABASE } = require("./env.config");

module.exports = [
  {
    ...DATABASE,
    synchronize: true,
    entities: ["server/models/**/*.entity.{js,ts}"],
    charset: "UTF8_GENERAL_CI",
    // migrations: ["server/migrations/*.{js,ts}"],
    // subscribers: ["server/subscribers/**/*.{js,ts}"],
    // seeds: ["server/migrations/seeds/**/*.{js,ts}"],
    // factories: ["server/migrations/factories/**/*.{js,ts}"],
  },
];
