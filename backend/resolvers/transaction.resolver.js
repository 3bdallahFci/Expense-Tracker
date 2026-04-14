import { transactions } from "../dummyData/data.js";

const transactionResolver = {
  Query: {
    transactions: () => {
      // Fetch transactions from the database
      return transactions;
    },
    transaction: (_, { transactionId }) => {
      // Fetch a single transaction by ID from the database
      return transactions.find(
        (transaction) => transaction._id === transactionId,
      );
    },
  },
};

export default transactionResolver;