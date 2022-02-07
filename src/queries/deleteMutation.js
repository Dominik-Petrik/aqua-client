import { gql } from "@apollo/client";

const DELETE_MUTATION = gql`
  mutation ($orderID: ID) {
    deleteOrder(orderID: $orderID)
  }
`;

export default DELETE_MUTATION;
