import { gql } from "@apollo/client";

const AUTOCOMPLETE_CUSTOMER = gql`
  query ($searchTerm: String) {
    autocompleteCustomer(searchTerm: $searchTerm) {
      id
      surname
      name
      city
      adress
      email
      phone
      birthdate
      ico
    }
  }
`;

export default AUTOCOMPLETE_CUSTOMER;
