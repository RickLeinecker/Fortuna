// Testing the Token Model from the data layer

// Required imports
const mongoose = require("mongoose");

// User Model
const Token = require('./tokenModel');

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

describe("Token model tests", () => {
    // Run before all tests are tried
    beforeAll(async () => {
        await Token.deleteMany({});
    });

    // Run after each test
    afterEach(async () => {
        await Token.deleteMany({});
    });

    // Run after all tests are done
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Tests if the Tokens have a module
    it("has a module", () => {
        expect(Token).toBeDefined();
    });

    // Get a Token
    describe("Get a token", () => {
        it("gets a token", async () => {
            const testId = new mongoose.Types.ObjectId();
            const token = new Token({
                _userId: testId,
                token: "randoToken"
            });
            await token.save();

            const foundToken = await Token.findOne({ token: "randoToken" });
            const expectedToken = "randoToken";

            expect(foundToken).toEqual(
                expect.objectContaining({
                    _userId: testId,
                    token: expectedToken
                })
            );
        });
    });

    // Save a Token
    describe("Save a token", () =>{
        it("saves a token", async () => {
            const testId = new mongoose.Types.ObjectId();
            const token = new Token({
                _userId: testId,
                token: "randoToken"
            });
            const savedToken = await token.save();

            const expectedToken = "randoToken";

            expect(savedToken).toEqual(
                expect.objectContaining({
                    _userId: testId,
                    token: expectedToken
                })
            );
        });
    });

    // Update a Token
    describe("Update a token", () => {
        it("updates a token", async () => {
            const testId = new mongoose.Types.ObjectId();
            const token = new Token({
                _userId: testId,
                token: "randoToken"
            });
            await token.save();

            const newId = new mongoose.Types.ObjectId();
            token._userId = newId;
            token.token = "editToken";
            const editedToken = await token.save();

            const expectedToken = "editToken";
            
            expect(editedToken).toEqual(
                expect.objectContaining({
                    _userId: newId,
                    token: expectedToken
                })
            );
        });
    });
});