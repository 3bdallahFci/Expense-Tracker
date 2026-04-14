const userTypeDef = `#graphql
  type User {
    _id: ID!
    email: String!
    name: String!
    password: String!
    profilePicture: String
    gender: String!
  }

    type Query {
        users: [User!]
        user(_id: ID!): User
    }

    type Mutation {
        signUp(input: SignUpInput!): User
        signIn(input: SignInInput!): User
    }

    input SignUpInput {
        email: String!
        name: String!
        password: String!
        profilePicture: String
        gender: String!
    }

    input SignInInput {
        email: String!
        password: String!
    }
`;

export default userTypeDef;
