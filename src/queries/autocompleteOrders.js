import { gql } from "@apollo/client";

const AUTOCOMPLETE_ORDERS = gql`
  query autocompleteOrder($searchTerm: String) {
    autocompleteOrder(searchTerm: $searchTerm)
  }
`;

export default AUTOCOMPLETE_ORDERS;
