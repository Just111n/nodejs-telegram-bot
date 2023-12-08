/* eslint-disable jest/no-commented-out-tests */
const { getStudentsMessage } = require("./getStudentsMessage");

describe("getStudentsMessage", () => {
  test("should return a string with each student’s information on a new line", () => {
    const students = [
      { studentId: "001", name: "Alice" },
      { studentId: "002", name: "Bob" },
    ];
    const expectedOutput = "001 Alice\n002 Bob";
    expect(getStudentsMessage(students)).toBe(expectedOutput);
  });

  test("should handle an empty array", () => {
    expect(getStudentsMessage([])).toBe("");
  });

  // Optional: Test with invalid input types if your function might receive them
  // test("should handle non-array inputs", () => {
  //   expect(getStudentsMessage(null)).toBe(""); // or however you expect the function to behave
  //   expect(getStudentsMessage(undefined)).toBe("");
  // });

  // // If your function should handle objects without studentId or name, add tests for that
  // test("should handle objects with missing properties", () => {
  //   const students = [
  //     { studentId: "003" }, // Missing name
  //     { name: "Charlie" }, // Missing studentId
  //   ];
  //   const expectedOutput = "003 undefined\nundefined Charlie";
  //   expect(getStudentsMessage(students)).toBe(expectedOutput);
  // });
});
