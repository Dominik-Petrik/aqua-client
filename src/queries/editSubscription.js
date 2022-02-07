import { gql } from "@apollo/client";

const EDIT_SUBSCRIPTION = gql`
  subscription {
    orderEdited {
      id
      field
      value
    }
  }
`;

export default EDIT_SUBSCRIPTION;
