import { gql } from "@apollo/client";

const DELETE_SESSION = gql`
  mutation ($key: String) {
    deleteSession(key: $key)
  }
`;

export default DELETE_SESSION;
