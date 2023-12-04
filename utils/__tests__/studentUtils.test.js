const { getOutputFromStudent } = require("../studentUtils");

describe("getOutputFromStudent", () => {
  test("should return a string combining studentId and name", () => {
    const student = { studentId: "123", name: "John Doe" };
    const result = getOutputFromStudent(student);
    console.log(result);
    expect(result).toBe("123 John Doe");
  });

  test("should handle missing studentId", () => {
    const student = { name: "John Doe" };
    const result = getOutputFromStudent(student);
    expect(result).toBe("undefined John Doe");
  });

  test("should handle missing name", () => {
    const student = { studentId: "123" };
    const result = getOutputFromStudent(student);
    expect(result).toBe("123 undefined");
  });

  test("should handle empty studentId and name", () => {
    const student = { studentId: "", name: "" };
    const result = getOutputFromStudent(student);
    expect(result).toBe(" ");
  });

  test("should handle non-string studentId and name", () => {
    const student = { studentId: 123, name: null };
    const result = getOutputFromStudent(student);
    expect(result).toBe("123 null");
  });

  test("should throw an error if no argument is passed", () => {
    expect(() => {
      getOutputFromStudent();
    }).toThrow();
  });
});
