// Testing the Market Sale Model from the data layer

// Required imports
const mongoose = require("mongoose");

// User Model
const MarketSale = require('./marketSaleModel');

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
        await MarketSale.deleteMany({});
    });

    // Run after each test
    afterEach(async () => {
        await MarketSale.deleteMany({});
    });

    // Run after all tests are done
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Tests if the Market Sales have a module
    it("has a module", () => {
        expect(MarketSale).toBeDefined();
    });

    // Get a Market Sale
    describe("Get a market sale", () => {
        it("gets a market sale", async () => {
            const testSeller = new mongoose.Types.ObjectId();
            const sale = new MarketSale({
                sellerId: testSeller,
                salePrice: 42,
                itemId: "testItem",
                itemType: "component",
                amount: 42
            });

            await sale.save();
            const foundSale = await MarketSale.findOne({ sellerId: testSeller });

            expect(foundSale).toEqual(
                expect.objectContaining({
                    sellerId: sale.sellerId,
                    salePrice: sale.salePrice,
                    itemId: sale.itemId,
                    itemType: sale.itemType,
                    amount: sale.amount
                })
            );
        });
    });

    // Save a Market Sale
    describe("Save a market sale", () => {
        it("saves a market sale", async () => {
            const testSeller = new mongoose.Types.ObjectId();
            const sale = new MarketSale({
                sellerId: testSeller,
                salePrice: 29392,
                itemId: "testCasusBlock",
                itemType: "casus",
                amount: 12
            });

            const savedSale = await sale.save();

            expect(savedSale).toEqual(
                expect.objectContaining({
                    sellerId: sale.sellerId,
                    salePrice: sale.salePrice,
                    itemId: sale.itemId,
                    itemType: sale.itemType,
                    amount: sale.amount
                })
            );
        });
    });

    // Update a Market Sale (Granted I don't think we do this in the project)
    describe("Update a market sale", () => {
        it("updates a market sale", async () => {
            const testSeller = new mongoose.Types.ObjectId();
            const sale = new MarketSale({
                sellerId: testSeller,
                salePrice: 10000,
                itemId: "testCasusBlock",
                itemType: "casus",
                amount: 24
            });

            await sale.save();
            const newId = new mongoose.Types.ObjectId();
            sale.sellerId = newId;
            sale.salePrice = 50000;
            sale.itemId = "someTankId";
            sale.itemType = "tank";
            sale.amount = 1;
            const editedSale = await sale.save();

            expect(editedSale).toEqual(
                expect.objectContaining({
                    sellerId: sale.sellerId,
                    salePrice: sale.salePrice,
                    itemId: sale.itemId,
                    itemType: sale.itemType,
                    amount: sale.amount
                })
            );
        });
    });
});