const {DATABASE} = require('./env.config');

module.exports = [
  {
    ...DATABASE,
    synchronize: true,
    entities: ['server/models/**/*.entity.{js,ts}'],
    seeds: ['server/models/**/*.seed.{js,ts}'],
    migrations: ['server/models/**/*.migration.{js,ts}'],
    factories: ['server/models/**/*.factory.{js,ts}'],
    subscribers: ['server/models/**/*.subscriber.{js,ts}'],
    // charset: "UTF8_GENERAL_CI",
  },
];
