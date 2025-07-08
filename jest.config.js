module.exports = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  transformIgnorePatterns: [
    "node_modules/(?!(zod|@hookform)/)", // 👈 tell Jest to transform ESM packages
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
