/* eslint-disable jest/no-commented-out-tests */
const { isCommandMessage } = require("./isCommandMessage"); // Adjust the path

describe("isCommandMessage", () => {
  test("should return true for strings starting with COMMAND_PREFIX", () => {
    expect(isCommandMessage("/start")).toBe(true);
    expect(isCommandMessage("/help")).toBe(true);
  });

  test("should return false for strings not starting with COMMAND_PREFIX", () => {
    expect(isCommandMessage("start")).toBe(false);
    expect(isCommandMessage("help")).toBe(false);
    expect(isCommandMessage(" /start")).toBe(false); // space before the prefix
  });

  //   test("should handle empty strings and undefined", () => {
  //     expect(isCommandMessage("")).toBe(false);
  //     expect(isCommandMessage()).toBe(false);
  //   });

  //   // If you want to test for null, numbers, or other types, you can add more tests
  //   test("should handle non-string inputs", () => {
  //     expect(isCommandMessage(null)).toBe(false);
  //     expect(isCommandMessage(123)).toBe(false);
  //   });
});
