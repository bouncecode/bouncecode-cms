const envconfig = require("./env.config");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const path = require("path");

module.exports = withPlugins([withImages], {
  webpack(config, options) {
    config.resolve.alias["client"] = path.resolve(__dirname, "client");
    config.resolve.alias["config"] = path.resolve(__dirname, "config");

    // polyfills
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries["main.js"] &&
        !entries["main.js"].includes("./client/polyfills.js")
      ) {
        entries["main.js"].unshift("./client/polyfills.js");
      }

      return entries;
    };

    return config;
  },
  distDir: ".next",
  publicRuntimeConfig: envconfig,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
});
