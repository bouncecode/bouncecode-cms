module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./docs/tests",
        filename: "index.html",
        expand: true,
      },
    ],
  ],
};
