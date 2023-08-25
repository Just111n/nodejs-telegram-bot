const COMMAND_PREFIX = "/";

exports.studentDdFromText = function (text) {
  const textLs = text.split("\n");
  const result = {};

  for (let item of textLs) {
    result[item.substring(3, 10)] = item.substring(11);
  }
  return result;
};

exports.textFromStudentDd = function (studentDd) {
  let result = "";
  let counter = 0;

  for (let [id, name] of Object.entries(studentDd)) {
    counter++;
    result += `${counter}. ${id} ${name}\n`;
  }

  if (result && counter === 1) {
    return `${id} ${name}`;
  } else if (result) {
    return result.slice(0, -1); // Removing the trailing newline
  } else {
    return "Something is not right....";
  }
};

exports.getOutputFromStudent = function (student) {
  const { studentId, name } = student;

  const result = `${studentId} ${name}`;
  for (let key in student) {
  }
  return result;
};

exports.getStudentsMessage = (students) => {
  return students.map(exports.getOutputFromStudent).join("\n");
};

exports.isCommandMessage = (text) => {
  return text.startsWith(COMMAND_PREFIX);
};

// Check if this module is the main module being executed
if (require.main === module) {
  // Example usage:
  const text = `1. 1234567 John Doe\n2. 2345678 Jane Smith`;
  console.log(exports.studentDdFromText(text));
  console.log(exports.textFromStudentDd(exports.studentDdFromText(text)));
}
