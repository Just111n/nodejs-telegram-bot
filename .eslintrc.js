module.exports = {
  env: {
    commonjs: true, // Enable CommonJS global variables and CommonJS scoping (useful for Node.js)
    es2021: true, // Enable all ECMAScript 2021 features
    node: true, // Enable Node.js global variables and Node.js scoping
  },
  extends: [
    "eslint:recommended", // Use the recommended rules from ESLint
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
    "plugin:jest/recommended", // Use Jest recommended rules
  ],
  plugins: [
    "prettier", // Allows for linting of Prettier formatting issues
    "jest", // Support for Jest testing framework
  ],
  overrides: [
    {
      env: {
        node: true, // Override: Explicitly enable Node.js environment
      },
      files: [".eslintrc.{js,cjs}"], // Target specific files for this override
      parserOptions: {
        sourceType: "script", // Treat files as CommonJS (as opposed to ES modules)
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest", // Use the latest ECMAScript standard
  },
  rules: {
    "prettier/prettier": ["warn", { endOfLine: "auto" }], // Warn on prettier issues, override end-of-line setting
  },
};
