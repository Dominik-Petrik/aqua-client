import { gql } from "@apollo/client";

const ORDER_SUBSCRIPTION = gql`
  subscription OrderCreated {
    orderCreated {
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

export default ORDER_SUBSCRIPTION;
