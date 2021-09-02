import { connect, disconnect, executeScript } from '../../helpers/testdb';
import {
    TransactionAggregateRoot,
    TransactionRepository,
} from "../../../src/logion/model/transaction.model";

describe('TransactionRepository', () => {

    beforeAll(async () => {
        await connect([TransactionAggregateRoot]);
        await executeScript("test/integration/model/transactions.sql");
        repository = new TransactionRepository();
    });

    let repository: TransactionRepository;

    afterAll(async () => {
        await disconnect();
    });

    it("finds transactions of 5H4MvAsobfZ6bBCDyj5dsrWYLrA8HrRzaqa9p61UXtxMhSCY", async () => {
        const transactions = await repository.findByAddress("5H4MvAsobfZ6bBCDyj5dsrWYLrA8HrRzaqa9p61UXtxMhSCY");
        expect(transactions.length).toBe(2);
    });

    it("finds transactions of 5CSbpCKSTvZefZYddesUQ9w6NDye2PHbf12MwBZGBgzGeGoo", async () => {
        const transactions = await repository.findByAddress("5CSbpCKSTvZefZYddesUQ9w6NDye2PHbf12MwBZGBgzGeGoo");
        expect(transactions.length).toBe(1);
    });

    it("finds no transaction for Unknown", async () => {
        const transactions = await repository.findByAddress("Unknown");
        expect(transactions.length).toBe(0);
    });
});