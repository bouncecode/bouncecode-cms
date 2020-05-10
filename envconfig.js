let certconfig = null;
try {
  certconfig = require("./certconfig");
} catch (e) {
  throw new Error(
    "Please generate certconfig.js file using `npm run certconfig`"
  );
}

let dbconfig = {};
try {
  dbconfig = require("./dbconfig");
} catch (e) {}

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  PORT: process.env.PORT || 8080,
  DEV: isDev,
  CERT_PUBLIC: certconfig.PUBLIC,
  CERT_PRIVATE: certconfig.PRIVATE,
  DATABASE: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ...dbconfig,
  },
};
