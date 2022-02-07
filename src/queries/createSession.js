import { gql } from "@apollo/client";

const CREATE_SESSION = gql`
  mutation {
    createSession {
      key
      createdAt
    }
  }
`;
export default CREATE_SESSION;
