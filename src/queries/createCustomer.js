import { gql } from "@apollo/client";

const CREATE_CUSTOMER = gql`
  mutation ($customerInput: CustomerInput) {
    createCustomer(customerInput: $customerInput)
  }
`;

export default CREATE_CUSTOMER;
