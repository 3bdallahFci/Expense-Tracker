import {gql} from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    authUser {
        _id
        username
        name
        profilePicture
    }
  }
`;