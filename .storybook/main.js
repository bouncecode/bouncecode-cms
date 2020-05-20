const path = require("path");

module.exports = {
  stories: ["../client/**/*.stories.(js|tsx|mdx)"],
  addons: [
    "@storybook/addon-storysource",
    "@storybook/addon-docs",
    "@storybook/addon-viewport/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-knobs/register",
  ],
  webpackFinal: async (config) => {
    config.resolve.alias["client"] = path.resolve(__dirname, "..", "client");
    config.resolve.alias["config"] = path.resolve(__dirname, "..", "config");

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
      },
    });

    // config.module.rules.push({
    //   test: /\.tsx?$/,
    //   include: path.resolve(__dirname, "../client"),
    //   loader: "awesome-typescript-loader", //any loader you want
    // });

    config.module.rules.push({
      test: /\.tsx?$/,
      include: path.resolve(__dirname, "../client"),
      loader: "react-docgen-typescript-loader",
    });

    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
