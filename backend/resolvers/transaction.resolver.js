import  transactions  from "../models/transaction.model.js";
const transactionResolver = {
  Query: {
    transactions: async(_, __, context) => {
      try{

        const user = context.getUser();

        if (!user) {
          throw new Error("Unauthorized");
        }

        const transactions = await transactions.find({ user: user._id });

        return transactions;

      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      // Fetch a single transaction by ID from the database
      try
      {
        const transaction = await transactions.findById(transactionId);

        if (!transaction) {
          throw new Error("Transaction not found");
        }
        return transaction;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch transaction");
      }
    },
  },

  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const user = context.getUser();
        console.log("User in createTransaction:", user._id);
        if (!user) {
          throw new Error("Unauthorized");
        }
        const newTransaction = new transactions({
          ...input,
          user: user._id,
        });
        const savedTransaction = await newTransaction.save();
        return savedTransaction;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to create transaction");
      }

    },
    updateTransaction: async (_, { input }, context) => {
        try {
          const user = context.getUser();
          if (!user) {
            throw new Error("Unauthorized");
          }
          const updatedTransaction = await transactions.findByIdAndUpdate(input.transactionId, input, { new: true });
          return updatedTransaction;
        } catch (error) {
          throw new Error("Failed to update transaction");
        }
    },
    deleteTransaction: async (_, { transactionId }, context) => {
        try {
          const user = context.getUser();
          if (!user) {  
            throw new Error("Unauthorized");
          }
          const deletedTransaction = await transactions.findByIdAndDelete(transactionId);
          return deletedTransaction;
        }
          catch (error) {
          throw new Error("Failed to delete transaction");
        }
    },
  },

};

export default transactionResolver;