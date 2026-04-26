import { gql } from "@apollo/client";

export const GET_TRANSACTION = gql`
  query GetTransactions {
    transactions {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;


export const GET_TRANSACTION_BY_ID = gql`
    query GetTransaction($transactionId: ID!) {
        transaction(transactionId: $transactionId) {
            _id
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`;
