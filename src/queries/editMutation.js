import { gql } from "@apollo/client";

const EDIT_MUTATION = gql`
  mutation ($orderID: ID, $field: String, $value: String) {
    editOrder(orderID: $orderID, field: $field, value: $value) {
      id
      value
      field
    }
  }
`;

export default EDIT_MUTATION;
