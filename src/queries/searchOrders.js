const { gql } = require("@apollo/client");

const SEARCH_ORDERS = gql`
  query SearchOrders($searchTerm: String) {
    searchOrders(searchTerm: $searchTerm) {
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

export default SEARCH_ORDERS;
