const userTypeDef = `#graphql
  type User {
    _id: ID!
    name: String!
    username: String!
    password: String!
    profilePicture: String
    gender: String! 
  }

    type Query {
        authUser: User
        user(_id: ID!): User
    }

    type Mutation {
        signUp(input: SignUpInput!): User
        login(input: SignInInput!): User
        logout: logoutResponse
    }

    input SignUpInput {
        name: String!
        username: String!
        password: String!
        gender: String!
    }

    input SignInInput {
        username: String!
        password: String!
    }

    type logoutResponse {
        message: String!
    }
`;

export default userTypeDef;
