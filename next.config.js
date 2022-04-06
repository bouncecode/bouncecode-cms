const envconfig = require('./env.config');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');

module.exports = withPlugins([withImages], {
  webpack(config, options) {
    config.resolve.fallback = {
      zlib: require.resolve('browserify-zlib'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('http-browserify'),
      https: require.resolve('https-browserify'),
      fs: false,
      os: false,
      tty: false,
    };

    config.resolve.alias['client'] = path.resolve(__dirname, 'client');
    config.resolve.alias['config'] = path.resolve(__dirname, 'config');

    // polyfills
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./src/polyfills.js')
      ) {
        entries['main.js'].unshift('./src/polyfills.js');
      }

      return entries;
    };

    return config;
  },
  distDir: '.next',
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['ko', 'en'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'ko',
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    // domains: [
    //   {
    //     domain: 'example.com',
    //     defaultLocale: 'en-US',
    //   },
    //   {
    //     domain: 'example.nl',
    //     defaultLocale: 'nl-NL',
    //   },
    //   {
    //     domain: 'example.fr',
    //     defaultLocale: 'fr',
    //     // an optional http field can also be used to test
    //     // locale domains locally with http instead of https
    //     http: true,
    //   },
    // ],
  },
});
