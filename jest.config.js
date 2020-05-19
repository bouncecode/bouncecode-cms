module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./docs/test-report",
        filename: "index.html",
        expand: true,
      },
    ],
  ],
};
