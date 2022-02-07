import { gql } from "@apollo/client";

const AUTH_SESSION = gql`
  query ($key: String) {
    authSession(key: $key)
  }
`;

export default AUTH_SESSION;
