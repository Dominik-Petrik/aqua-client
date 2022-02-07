import { gql } from "@apollo/client";

const GET_ORDERS = gql`
  query (
    $order: Int
    $states: [String]
    $offset: Int
    $createdAfter: Date
    $createdBefore: Date
  ) {
    getOrders(
      order: $order
      states: $states
      offset: $offset
      createdAfter: $createdAfter
      createdBefore: $createdBefore
    ) {
      id
      state
      createdAt
      surname
      name
      city
      adress
      email
      phone
      birthdate
      ico
      note
      createdBy
      finishedAt
      finishedBy
    }
  }
`;

export default GET_ORDERS;
