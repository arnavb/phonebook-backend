module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  ignorePatterns: ["build/**/*"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    eqeqeq: "error",
  },
};
