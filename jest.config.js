module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ['<rootDir>/scripts/jest.setup.ts'],
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
