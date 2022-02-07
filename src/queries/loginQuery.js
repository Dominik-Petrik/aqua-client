import { gql } from "@apollo/client";

const LOGIN_QUERY = gql`
  query ($password: String) {
    login(password: $password)
  }
`;

export default LOGIN_QUERY;
