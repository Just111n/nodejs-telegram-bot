const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Student = require("../models/student");

let mongoServer;

// Before running the tests, start MongoDB in-memory server
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Connect to the in-memory database
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// After all tests are done, stop MongoDB in-memory server
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Clear database between each test
afterEach(async () => {
  await Student.deleteMany({});
});

describe("Student Model Test", () => {
  // Test case: successfully create a student
  it("creates and saves a student successfully", async () => {
    const validStudent = new Student({ studentId: 1, name: "John Doe" });
    const savedStudent = await validStudent.save();

    expect(savedStudent._id).toBeDefined();
    expect(savedStudent.studentId).toBe(1);
    expect(savedStudent.name).toBe("John Doe");
  });

  // Test case: missing required field
  it("throws validation error when required field is missing", async () => {
    const invalidStudent = new Student({ name: "Jane Doe" });

    let error;
    try {
      await invalidStudent.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.studentId).toBeDefined();
  });

  // Test case: successfully updating a student
  it("updates a student successfully", async () => {
    const student = new Student({ studentId: 2, name: "Alex Smith" });
    await student.save();

    student.name = "Alex Johnson";
    const updatedStudent = await student.save();

    expect(updatedStudent.name).toBe("Alex Johnson");
  });

  // Test case: deleting a student
  it("deletes a student successfully", async () => {
    const student = new Student({ studentId: 3, name: "Chris Evans" });
    await student.save();

    await Student.deleteOne({ studentId: 3 });
    const deletedStudent = await Student.findOne({ studentId: 3 });

    expect(deletedStudent).toBeNull();
  });
});
