// Testing the User Model from the data layer

// Required imports
const mongoose = require("mongoose");

// User Model
const User = require('./userModel');

// Create test database
const testDB = "mongodb://localhost/test";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};
mongoose.connect(testDB, options)
    .then(() => console.log("Connected to Test Database"))
    .catch(() => console.error("Could not connect to Test Database"));

describe("User model test", () => {
    // Run before all tests are tried
    beforeAll(async () => {
        await User.deleteMany({});
    });

    // Run after each test
    afterEach(async () => {
        await User.deleteMany({});
    });

    // Run after all tests are done
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Tests if the Users have a module
    it("has a module", () => {
        expect(User).toBeDefined();
    });

    // Getting User
    describe("Get a user", () => {
        it("gets a user", async () => {
            const user = new User({
                userName: "Test",
                email: "test@testing.com",
                password: "TestP@ssw0rd"
            });
            await user.save();

            const foundUser = await User.findOne({ userName: "Test" });
            const expected = "Test";
            const actual = foundUser.userName;
            expect(actual).toEqual(expected);
        });
    });

    // Saving a User
    describe("Save a user", () => {
        it("saves a user", async () => {
            const user = new User({
                userName: "TestASave",
                email: "testsave@testing.com",
                password: "TestP@ssw0rd"
            });
            const savedUser = await user.save();

            const expectedUserName = "TestASave";
            const expectedEmail = "testsave@testing.com";
            const actuaUserName = savedUser.userName;
            const actualEmail = savedUser.email;

            expect(actuaUserName).toEqual(expectedUserName);
            expect(actualEmail).toEqual(expectedEmail);
        });
    });

    // Updating a User
    describe("Update a user", () =>{
        it("updates a user", async () => {
            const user = new User({
                userName: "TestASave",
                email: "testsave@testing.com",
                password: "TestP@ssw0rd"
            });
            await user.save();

            user.userName = "TestAEdit";
            user.email = "testedit@edited.com";
            const updatedUser = await user.save();

            const expectedUserName = "TestAEdit";
            const expectedEmail = "testedit@edited.com";
            const actuaUserName = updatedUser.userName;
            const actualEmail = updatedUser.email;

            expect(actuaUserName).toEqual(expectedUserName);
            expect(actualEmail).toEqual(expectedEmail);
        });
    });
});
