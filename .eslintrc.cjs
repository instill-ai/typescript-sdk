module.exports = {
  root: true,
  extends: ["@instill-ai/eslint-config-cortex"],
  ignorePatterns: [
    ".eslintrc.cjs",
    "tsup.config.ts",
    "vitest.config.ts",
    "dist/",
    "examples/",
    "setupTests.ts",
    "turbo.json",
  ],
};
