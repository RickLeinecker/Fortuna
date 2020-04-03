// Testing the Token Model from the data layer

// Required imports
const mongoose = require("mongoose");

// User Model
const Tank = require('./tankModel');

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

describe("Tank model tests", () => {
    // Run before all tests are tried
    beforeAll(async () => {
        await Tank.deleteMany({});
    });

    // Run after each test
    afterEach(async () => {
        await Tank.deleteMany({});
    });

    // Run after all tests are done
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Tests if the Tanks have a module
    it("has a module", () => {
        expect(Tank).toBeDefined();
    });

    // Get a Tank
    describe("Get a tank", () => {
        it("gets a tank", async () => {
            const testId = new mongoose.Types.ObjectId().toHexString();
            const testComp = ['empty', 'empty', 'empty', 
            'empty', 'empty', 'empty', 'empty', 'empty', 
            'empty', 'empty', 'empty'];
            const tank = new Tank({
                tankName: "TestTank",
                userId: testId,
                components: testComp
            });

            await tank.save();
            const foundTank = await Tank.findOne({ tankName: "TestTank" });

            expect(foundTank).toEqual(
                expect.objectContaining({
                    tankName: "TestTank",
                    userId: expect.stringMatching(testId)
                })
            );

            // expect(foundTank.tankName).toEqual(expectedName);
            // expect(foundTank.components).toEqual(expect.arrayContaining(testComp));
            // expect(foundTank.isBot).toEqual(false);
        });
    });
});