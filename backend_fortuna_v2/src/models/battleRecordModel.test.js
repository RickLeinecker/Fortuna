// Testing the Battle Record Model from the data layer

// Required imports
const mongoose = require("mongoose");

// User Model
const BattleRecord = require('./battleRecordModel');

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

describe("Market Sale model tests", () => {
    // Run before all tests are tried
    beforeAll(async () => {
        await BattleRecord.deleteMany({});
    });

    // Run after each test
    afterEach(async () => {
        await BattleRecord.deleteMany({});
    });

    // Run after all tests are done
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Tests if the Battle Records have a module
    it("has a module", () => {
        expect(BattleRecord).toBeDefined();
    });

    // Get a Battle Record
    describe("Get a battle record", () => {
        it("gets a battle record", async () => {
            const playerOne = new mongoose.Types.ObjectId();
            const playerTwo = new mongoose.Types.ObjectId();
            const recordTank = {
                tankName: "DaTank",
                components: [],
                casusCode: {}
            }
            const record = new BattleRecord({
                userOne: playerOne,
                userTwo: playerTwo,
                winner: -1,
                prizeMoney: 1000,
                eloExchanged: 0,
                map: 'HEX',
                tankOne: recordTank,
                tankTwo: recordTank,
                tankTeamOne: [recordTank],
                tankTeamTwo: [recordTank]
            });

            await record.save();
            const foundRecord = await BattleRecord.findOne({ userOne: playerOne });

            expect(foundRecord).toEqual(
                expect.objectContaining({
                    userOne: record.userOne,
                    userTwo: record.userTwo,
                    winner: record.winner,
                    prizeMoney: record.prizeMoney,
                    eloExchanged: record.eloExchanged
                })
            );
        });
    });

    // Save a Battle Record
    describe("Save a battle record", () => {
        it("saves a battle record", async () => {
            const playerOne = new mongoose.Types.ObjectId();
            const playerTwo = new mongoose.Types.ObjectId();
            const recordTank = {
                tankName: "DaTank",
                components: [],
                casusCode: {}
            }
            const record = new BattleRecord({
                userOne: playerOne,
                userTwo: playerTwo,
                winner: -1,
                prizeMoney: 1000,
                eloExchanged: 0,
                map: 'DIRT',
                tankOne: recordTank,
                tankTwo: recordTank,
                tankTeamOne: [recordTank],
                tankTeamTwo: [recordTank]
            });

            const savedRecord = await record.save();

            expect(savedRecord).toEqual(
                expect.objectContaining({
                    userOne: record.userOne,
                    userTwo: record.userTwo,
                    winner: record.winner,
                    prizeMoney: record.prizeMoney,
                    eloExchanged: record.eloExchanged
                })
            );
        });
    });

    // Update a Battle Record
    describe("Update a battle record", () => {
        it("updates a battle record", async () => {
            const playerOne = new mongoose.Types.ObjectId();
            const playerTwo = new mongoose.Types.ObjectId();
            const recordTank = {
                tankName: "DaTank",
                components: [],
                casusCode: {}
            }
            const record = new BattleRecord({
                userOne: playerOne,
                userTwo: playerTwo,
                winner: -1,
                prizeMoney: 1000,
                eloExchanged: 0,
                map: 'LUNAR',
                tankOne: recordTank,
                tankTwo: recordTank,
                tankTeamOne: [recordTank],
                tankTeamTwo: [recordTank]
            });

            await record.save();
            record.userOne = new mongoose.Types.ObjectId();
            record.userTwo = new mongoose.Types.ObjectId();
            record.winner = 1;
            record.prizeMoney = 1002940;
            record.eloExchanged = 148291;
            const editedRecord = await record.save();

            expect(editedRecord).toEqual(
                expect.objectContaining({
                    userOne: record.userOne,
                    userTwo: record.userTwo,
                    winner: record.winner,
                    prizeMoney: record.prizeMoney,
                    eloExchanged: record.eloExchanged
                })
            );
        });
    });
});