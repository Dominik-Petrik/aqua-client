import { gql } from "@apollo/client";

const CREATE_ORDER = gql`
  mutation ($orderInput: OrderInput) {
    createOrder(orderInput: $orderInput) {
      id
    }
  }
`;

export default CREATE_ORDER;
