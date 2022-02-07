import { gql } from "@apollo/client";

const DELETE_SUBSCRIPTION = gql`
  subscription {
    orderDeleted
  }
`;

export default DELETE_SUBSCRIPTION;
