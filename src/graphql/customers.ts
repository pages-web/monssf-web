import { gql } from "@apollo/client";

/**
 * erxes client-portal customer API (core:customer), reachable with the
 * website's `x-app-token`. `cpCustomersAdd` creates a contact under
 * Contacts → Customers — no ticket pipeline required.
 *
 * The field values are passed via `propertiesData` as an OBJECT keyed by the
 * field _id: `{ "<cpFields._id>": value }`. (The array form `[{field,value}]`
 * is accepted by the mutation but silently dropped — verified.) firstName /
 * lastName / primaryPhone are also set from the matching field codes so the
 * record is readable in admin.
 */
export const CP_CUSTOMERS_ADD = gql`
  mutation CpCustomersAdd(
    $firstName: String
    $lastName: String
    $primaryEmail: String
    $primaryPhone: String
    $state: String
    $propertiesData: JSON
  ) {
    cpCustomersAdd(
      firstName: $firstName
      lastName: $lastName
      primaryEmail: $primaryEmail
      primaryPhone: $primaryPhone
      state: $state
      propertiesData: $propertiesData
    ) {
      _id
    }
  }
`;
