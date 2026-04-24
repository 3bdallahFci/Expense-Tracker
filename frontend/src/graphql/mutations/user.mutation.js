import { gql } from "@apollo/client";

export const SigN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      name
      password
    }
  }
`;


export const LOGIN = gql`
  mutation Login($input: SignInInput!) {
    login(input: $input) {
      _id
      name
      password
    }
  }
`;


export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`; 